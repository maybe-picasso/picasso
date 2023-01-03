import { createModel } from '@rematch/core';

import { RootModel } from './';

interface ChatMessage {
  userId?: string;
  nickName?: string;
  message: string;
  timestamp: number;
  isMine?: boolean;
  isSystem?: boolean;
}

export interface ChatState {
  chatList: ChatMessage[];
}

export const initialState: ChatState = {
  chatList: [],
};

export const chat = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    addChat(state, payload: ChatMessage) {
      state.chatList.push(payload);
      return state;
    },
  },
});
