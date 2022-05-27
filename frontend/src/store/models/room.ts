import { createModel } from '@rematch/core';
import { RootModel } from './';

export interface RoomState {
  isConnectedSocket: boolean;
  isJoined: boolean;
  userInfo: Picasso.UserInfo | null;
  participants: Picasso.UserInfo[];
}

export const initialState: RoomState = {
  isConnectedSocket: false,
  isJoined: false,
  userInfo: null,
  participants: [],
};

export const room = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    setSocketState(state, payload: boolean) {
      state.isConnectedSocket = payload;
      return state;
    },
    setJoinedState(state, payload: boolean) {
      state.isJoined = payload;
      return state;
    },
    setUserInfo(state, payload: Picasso.UserInfo) {
      state.userInfo = payload;
      return state;
    },
    updateParticipants(state, payload: Picasso.UserInfo[]) {
      state.participants = payload;
      return state;
    },
  },
});
