import { createModel } from '@rematch/core';
import { RootModel } from './';

export interface GameState {
  correctUsers: string[];
}

export const initialState: GameState = {
  correctUsers: [],
};

export const game = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    addCorrectUser(state, payload) {
      state.correctUsers.push(payload);
      return state;
    },
  },
});
