import { createModel } from '@rematch/core';
import { RootModel } from './';
import { values } from 'lodash-es';

interface VideoState {
  userId: string;
  stream: MediaStream;
  videoEnabled: boolean;
  audioEnabled: boolean;
}
interface ChatState {
  nickName: string;
  message: string;
  isMine?: boolean;
}
interface RoomState {
  isEnteredRoom: boolean;
  isConnectedSocket: boolean;
  userInfo: any | null;
  participants: any[];
  videos: VideoState[];
  chatList: ChatState[];
}

const initialState: RoomState = {
  isEnteredRoom: false,
  isConnectedSocket: false,
  userInfo: null,
  participants: [],
  videos: [],
  chatList: [],
};

export const room = createModel<RootModel>()({
  state: initialState,
  selectors: (slice, createSelector) => ({
    state: () => slice,
    localVideoState: () =>
      createSelector(slice, ({ userInfo, videos }) => {
        if (userInfo) {
          return videos.find((info) => info.userId === userInfo.userId);
        }
        return null;
      }),
  }),
  reducers: {
    updateSocketConnectionState(state, payload: boolean) {
      state.isConnectedSocket = payload;
      return state;
    },
    updateEnteredRoomState(state, payload: boolean) {
      state.isEnteredRoom = payload;
      return state;
    },
    setParticipants(state, payload: {}) {
      const arr = values(payload);
      state.participants = arr;
      return state;
    },
    setUserInfo(state, payload: {}) {
      state.userInfo = payload;
      return state;
    },
    addVideo(state, payload: VideoState) {
      state.videos.push(payload);
      return state;
    },
    updateVideoEnabled(state, payload: { userId: string; enabled: boolean }) {
      state.videos.forEach((video) => {
        if (video.userId === payload.userId) {
          video.videoEnabled = payload.enabled;
        }
      });
      return state;
    },
    addChat(state, payload: ChatState) {
      state.chatList.push(payload);
      return state;
    },
  },
  effects: (dispatch) => ({
    incrementAsync(payload: number, state) {
      dispatch.count.increment(payload);
    },
  }),
});
