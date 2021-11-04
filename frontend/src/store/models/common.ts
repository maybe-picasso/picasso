import { createModel } from '@rematch/core';
import { RootModel } from './';

export const common = createModel<RootModel>()({
  state: 0,
  selectors: (slice, createSelector) => ({
    state() {
      return slice;
    },
  }),
  reducers: {
    increment(state, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    incrementAsync(payload: number, state) {
      dispatch.count.increment(payload);
    },
  }),
});
