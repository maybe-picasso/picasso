import { createModel } from '@rematch/core';

import { RootModel } from './';

export interface CommonState {
  isLoading: boolean;
}

export const initialState: CommonState = {
  isLoading: false,
};

export const common = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },
  },
});
