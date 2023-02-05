import { createModel } from '@rematch/core';

import { RootModel } from './';

interface Reaction {
  userId: string;
  nickName: string;
  type: string;
  timestamp: number;
}

export interface ReactionState {
  reactionList: Reaction[];
}

export const initialState: ReactionState = {
  reactionList: [],
};

export const reaction = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    add(state, payload: Reaction) {
      state.reactionList.push(payload);
      return state;
    },
  },
});
