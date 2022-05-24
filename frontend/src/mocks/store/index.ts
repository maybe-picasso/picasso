import { initialState as commonInitState } from 'store/models/common';
import { initialState as roomInitState } from 'store/models/room';
import { initialState as chatInitState } from 'store/models/chat';
import { initialState as toolsInitState } from 'store/models/tools';
import { initialState as gameInitState } from 'store/models/game';
import { initialState as gamePointInitState } from 'store/models/gamePoint';
import { RootState } from '../../../src/store';
import { participants } from './room';
import { status } from './game';
import { chatList } from './chat';
import { QUESTIONS } from 'constants/index';

export type MockStore = Pick<RootState, 'common' | 'room' | 'game' | 'gamePoint' | 'chat' | 'tools'>;

export const 룸_프로필설정: MockStore = {
  common: commonInitState,
  room: roomInitState,
  game: gameInitState,
  gamePoint: gamePointInitState,
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
  game: gameInitState,
  gamePoint: gamePointInitState,
  chat: {
    ...chatInitState,
    chatList,
  },
  tools: toolsInitState,
};

export const 룸_게임완료: MockStore = {
  ...룸_게임화면,
  game: {
    ...룸_게임화면.game,
    questions: QUESTIONS,
    status: status.COMPLETED,
    time: 0,
  },
};

export const 룸_게임종료: MockStore = {
  ...룸_게임완료,
  game: {
    ...룸_게임완료.game,
    status: status.GAMEOVER,
  },
};
