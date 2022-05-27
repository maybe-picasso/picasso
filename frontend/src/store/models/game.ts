import { createModel } from '@rematch/core';
import { RootModel } from './';
import { GameStatus } from 'types/enums';

export interface GameState {
  status: GameStatus;
  painterId: string | null;
  questions: string[];
  round: number;
  time: number;
}

export const initialState: GameState = {
  status: GameStatus.WAITING,
  painterId: null,
  questions: [],
  round: 1,
  time: 60,
};

// TODO: 점수처리 방법 고민
// 3위까지는 남은 시간의 2배, 1.5배, 1.2배 4위 부터 1.0
// 참여자수 가산점?

export const game = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
    isVisibleOverlayContent: () =>
      slice(({ status }) => status === GameStatus.COMPLETED || status === GameStatus.GAMEOVER),
  }),
  reducers: {
    setQuestions(state, payload: string[]) {
      state.questions = payload;
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
    init({ questions }: Pick<GameState, 'questions'>, state) {
      state.game.status = GameStatus.WAITING;
      dispatch.game.setQuestions(questions);
      dispatch.game.setRound(initialState.round);
      dispatch.game.setTime(initialState.time);
    },
    play(dispatch, state) {
      dispatch.game.setStatus(GameStatus.PLAYING);
    },
    complete(dispatch, state) {
      dispatch.game.setStatus(GameStatus.COMPLETED);
    },
    nextQuestion(_, state) {
      const { game } = state;
      dispatch.game.setRound(game.round + 1);
      dispatch.game.setTime(initialState.time);
      // TODO: 사용자 프로필 점수 반영 처리
      dispatch.gamePoint.resetCorrectUserPoint();
    },
    finish(dispatch, state) {
      const { game } = state;
      dispatch.game.setStatus(GameStatus.GAMEOVER);
      dispatch.game.setRound(game.questions.length);
    },
  }),
});
