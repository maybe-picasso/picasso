import * as workerTimers from 'worker-timers';
import { createModel } from '@rematch/core';
import { RootModel } from './';
import { GameStatus } from 'types/enums';
import { compare } from 'helpers/utils';
import { sendMessage } from 'core/socket';
import { SocketMessageType } from 'types/enums';

export interface GameState {
  status: GameStatus;
  painterId: string | null;
  questions: string[];
  round: number;
  time: number;
  readyUserIds: string[];
}

export const initialState: GameState = {
  status: GameStatus.WAITING,
  painterId: null,
  questions: [],
  round: 1,
  time: 60,
  readyUserIds: [],
};

const NEXT_ACTION_DELAY = 5000;

// TODO: 점수처리 방법 고민
// 3위까지는 남은 시간의 2배, 1.5배, 1.2배 4위 부터 1.0
// 참여자수 가산점?

export const game = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
    isVisibleOverlayContent: () =>
      slice(
        ({ status }) =>
          status === GameStatus.READY ||
          status === GameStatus.STANDBY_TURN ||
          status === GameStatus.COMPLETED ||
          status === GameStatus.GAMEOVER
      ),
    currentQuestion: () => slice(({ questions, round }) => questions[round - 1]),
  }),
  reducers: {
    setQuestions(state, payload: string[]) {
      state.questions = payload;
      return state;
    },
    setPainterId(state, payload: string) {
      state.painterId = payload;
      return state;
    },
    setRound(state, payload: number) {
      state.round = payload;
      return state;
    },
    setTime(state, payload: number) {
      state.time = payload;
      return state;
    },
    setStatus(state, payload: GameStatus) {
      state.status = payload;
      return state;
    },
  },
  effects: (dispatch) => ({
    init(_, rootState) {
      const { room } = rootState;
      const { participants } = room;
      dispatch.game.standBy();
      dispatch.game.setRound(initialState.round);
      dispatch.game.setTime(initialState.time);
      dispatch.game.setPainterId(participants[0].userId);
    },
    wait() {
      dispatch.game.setStatus(GameStatus.WAITING);
    },
    ready() {
      dispatch.game.setStatus(GameStatus.READY);
    },
    standBy() {
      dispatch.game.setStatus(GameStatus.STANDBY_TURN);

      // 문제 안내 후 5초뒤 게임 시작
      workerTimers.setTimeout(() => {
        dispatch.game.play();
      }, NEXT_ACTION_DELAY);
    },
    play() {
      dispatch.game.setStatus(GameStatus.PLAYING);
    },
    complete() {
      dispatch.game.setStatus(GameStatus.COMPLETED);

      // 라운드 완료 후 5초뒤 다음 문제 안내
      workerTimers.setTimeout(() => {
        dispatch.game.nextQuestion({});
      }, NEXT_ACTION_DELAY);
    },
    finish() {
      dispatch.game.setStatus(GameStatus.GAMEOVER);
    },
    nextQuestion(_, rootState) {
      const { game, room } = rootState;
      const { participants } = room;
      const nextRound = game.round + 1;
      const nextPainterIndex = nextRound - 1;
      const nextPainterId =
        participants[nextPainterIndex]?.userId ??
        participants[(nextPainterIndex - participants.length) % participants.length].userId; // 사용자 수보다 라운드가 커질때 순차 탐색 연산 처리

      if (nextRound > game.questions.length) {
        dispatch.game.finish();
        return;
      }

      dispatch.game.standBy();
      dispatch.game.setRound(nextRound);
      dispatch.game.setTime(initialState.time);
      dispatch.game.setPainterId(nextPainterId);
      dispatch.gamePoint.resetCorrectUserInfo();
    },
    checkUserAnswer({ userId, text }: { userId: string; text: string }, rootState) {
      const { game, gamePoint } = rootState;
      const { questions, round, time, painterId } = game;
      const { correctUserList } = gamePoint;
      const currentQuestion = questions[round - 1];
      const isCorrect = compare(currentQuestion, text);
      const isExistCorrectUser = correctUserList.find((user) => user.userId === userId);

      // 페인터가 입력한 정답 무시
      // 이미 정답을 맞힌 사용자 무시
      if (painterId === userId || isExistCorrectUser) {
        return;
      }

      if (isCorrect && time) {
        dispatch.gamePoint.correctUser({ userId });

        sendMessage({
          type: SocketMessageType.CORRECT_USER,
          body: {
            userId,
          },
        });
      }
    },
  }),
});
