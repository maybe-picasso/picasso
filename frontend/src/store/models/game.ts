import * as workerTimers from 'worker-timers';
import { createModel } from '@rematch/core';

import { sendMessage } from '@/core/socket';
import { compare } from '@/helpers/utils';
import { GameStatus } from '@/types/enums';
import { SocketMessageType } from '@/types/enums';
import { RootModel } from './';

export interface GameState {
  status: GameStatus;
  readyUserIdList: string[];
  painterId: string | null;
  questions: string[];
  round: number;
  time: number;
  isBreakaway: boolean; // 문제 출제자 중도 이탈 여부
}

export const initialState: GameState = {
  status: GameStatus.WAITING_PLAYER,
  readyUserIdList: [],
  painterId: null,
  questions: [],
  round: 1,
  time: 60,
  isBreakaway: false,
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
          status === GameStatus.WAITING_READY ||
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
    setBreakaway(state, payload: boolean) {
      state.isBreakaway = payload;
      return state;
    },
    setReadyUserIdList(state, idList: string[]) {
      state.readyUserIdList = idList;
      return state;
    },
    toggleReadyUser(state, { userId, forceValue }: { userId: string; forceValue?: boolean }) {
      if (state.readyUserIdList.includes(userId) || forceValue === false) {
        state.readyUserIdList = state.readyUserIdList.filter((thisId) => thisId !== userId);
      } else {
        state.readyUserIdList.push(userId);
      }
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
      dispatch.game.setReadyUserIdList([]);
    },
    wait() {
      dispatch.game.setStatus(GameStatus.WAITING_PLAYER);
    },
    ready() {
      dispatch.game.setStatus(GameStatus.WAITING_READY);
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
      const userLength = participants.length;
      const nextRound = game.round + 1;
      const nextPainterIndex = nextRound - 1;
      const nextPainterId =
        participants[nextPainterIndex]?.userId ?? participants[(nextPainterIndex - userLength) % userLength].userId; // 사용자 수보다 라운드가 커질때 순차 탐색 연산 처리

      if (nextRound > game.questions.length) {
        dispatch.game.finish();
        return;
      }

      if (game.isBreakaway) {
        dispatch.game.setBreakaway(false);
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
    breakaway() {
      // 현재 페인터 나갔을때 처리
      dispatch.game.setTime(0);
      dispatch.game.setBreakaway(true);
    },
  }),
});
