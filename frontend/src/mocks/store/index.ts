import { initialState as commonInitState } from 'store/models/common';
import { initialState as roomInitState } from 'store/models/room';
import { initialState as chatInitState } from 'store/models/chat';
import { initialState as toolsInitState } from 'store/models/tools';
import { RootState } from '../../../src/store';
import { participants } from './room';

export type MockStore = Pick<RootState, 'common' | 'room' | 'chat' | 'tools'>;

export const 룸_프로필설정: MockStore = {
  common: commonInitState,
  room: roomInitState,
  chat: chatInitState,
  tools: toolsInitState,
};

export const 룸_게임화면: MockStore = {
  common: commonInitState,
  room: {
    ...roomInitState,
    isJoined: true,
    isConnectedSocket: true,
    userInfo: participants[0],
    participants,
  },
  chat: chatInitState,
  tools: toolsInitState,
};
