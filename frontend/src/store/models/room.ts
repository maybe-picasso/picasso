import { createModel } from '@rematch/core';
import { RootModel } from './';
import { values } from 'lodash-es';

interface RoomState {
  isConnectedSocket: boolean;
  isJoined: boolean;
  userInfo: any | null;
  participants: any[];
}

const initialState: RoomState = {
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
    setUserInfo(state, payload: Record<string, any>) {
      state.userInfo = payload;
      return state;
    },
    updateParticipants(state, payload: Record<string, any>[]) {
      state.participants = payload;
      return state;
    },
  },
});
