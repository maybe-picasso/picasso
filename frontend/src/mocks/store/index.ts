import { initialState as commonInitState } from 'store/models/common';
import { initialState as roomInitState } from 'store/models/room';
import { initialState as chatInitState } from 'store/models/chat';
import { initialState as toolsInitState } from 'store/models/tools';
import { RootState } from '../../../src/store';

export type MockStore = Pick<RootState, 'common' | 'room' | 'chat' | 'tools'>;

export const 룸_기본: MockStore = {
  common: commonInitState,
  room: roomInitState,
  chat: chatInitState,
  tools: toolsInitState,
};

export const 룸_입장: MockStore = {
  common: commonInitState,
  room: {
    ...roomInitState,
    isJoined: true,
    isConnectedSocket: true,
    userInfo: {
      clientId: 'AxnB8CWFhIUVSbTjAAm5',
      userId: 'a15f6136-4471-4f4d-90f4-b440229e6552',
      nickName: 'Waiki',
      profileIndex: 6,
    },
    participants: [
      {
        clientId: 'BxnB8CWFhIUVSbTjAAm5',
        userId: 'b15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Ella',
        profileIndex: 1,
      },
      {
        clientId: 'AxnB8CWFhIUVSbTjAAm5',
        userId: 'a15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Waiki',
        profileIndex: 6,
      },
      {
        clientId: 'CxnB8CWFhIUVSbTjAAm5',
        userId: 'c15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Murky',
        profileIndex: 13,
      },
      {
        clientId: 'DxnB8CWFhIUVSbTjAAm5',
        userId: 'd15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Coka',
        profileIndex: 10,
      },
      {
        clientId: 'ExnB8CWFhIUVSbTjAAm5',
        userId: 'e15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Cola~~~~~~~~~',
        profileIndex: 20,
      },
    ],
  },
  chat: chatInitState,
  tools: toolsInitState,
};
