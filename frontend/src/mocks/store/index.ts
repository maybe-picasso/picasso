import { CommonState, initialState as commonInitState } from 'store/models/common';
import { RoomState, initialState as roomInitState } from 'store/models/room';
import { ChatState, initialState as chatInitState } from 'store/models/chat';
import { ToolsState, initialState as toolsInitState } from 'store/models/tools';
import { PartialDeep } from 'type-fest';
import { RootState } from '../../../src/store';

interface Store {
  common: CommonState;
  room: RoomState;
  chat: ChatState;
  tools: ToolsState;
}

export const 룸_기본: Partial<RootState> = {
  common: commonInitState,
  room: roomInitState,
  chat: chatInitState,
  tools: toolsInitState,
};

export const 룸_입장: Partial<RootState> = {
  common: commonInitState,
  room: {
    ...roomInitState,
    isJoined: true,
    isConnectedSocket: true,
    userInfo: {
      clientId: 'PxnB8CWFhIUVSbTjAAm5',
      userId: 'd15f6136-4471-4f4d-90f4-b440229e6552',
      nickName: 'AAA',
      profileIndex: 1,
    },
    participants: [
      {
        clientId: 'AxnB8CWFhIUVSbTjAAm5',
        userId: 'a15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Waiki',
        profileIndex: 1,
      },
      {
        clientId: 'BxnB8CWFhIUVSbTjAAm5',
        userId: 'b15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Ella',
        profileIndex: 5,
      },
      {
        clientId: 'CxnB8CWFhIUVSbTjAAm5',
        userId: 'c15f6136-4471-4f4d-90f4-b440229e6552',
        nickName: 'Murky',
        profileIndex: 10,
      },
    ],
  },
  chat: chatInitState,
  tools: toolsInitState,
};
