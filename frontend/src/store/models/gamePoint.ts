import { createModel } from '@rematch/core';
import { RootModel } from './';

export interface GamePointState {
  correctUsersPoint: Record<string, any>[]; // 현재 라운드의 정답자 포인트
}

export const initialState: GamePointState = {
  correctUsersPoint: [],
};

// 점수처리 방법 고민,
// 3위까지는 남은 시간의 2배, 1.5배, 1.2배 4위 부터 1.0
// 참여자수 가산점?

export const gamePoint = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    addCorrectUserPoint(state, payload) {
      state.correctUsersPoint.push(payload);
      return state;
    },
    resetCorrectUserPoint(state) {
      state.correctUsersPoint = [];
      return state;
    },
  },
});
