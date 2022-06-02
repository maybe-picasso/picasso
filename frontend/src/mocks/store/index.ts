import { initialState as commonInitState } from 'store/models/common';
import { initialState as roomInitState } from 'store/models/room';
import { initialState as chatInitState } from 'store/models/chat';
import { initialState as toolsInitState } from 'store/models/tools';
import { initialState as gameInitState } from 'store/models/game';
import { initialState as gamePointInitState } from 'store/models/gamePoint';
import { RootState } from 'store';
import { participants } from './room';
import { correctUsersPoint } from './gamePoint';
import { chatList } from './chat';
import { QUESTIONS } from 'constants/index';
import { GameStatus } from 'types/enums';

export type MockStore = Pick<RootState, 'common' | 'room' | 'game' | 'gamePoint' | 'chat' | 'tools'>;

export const 프로필설정: MockStore = {
  common: commonInitState,
  room: roomInitState,
  game: gameInitState,
  gamePoint: gamePointInitState,
  chat: chatInitState,
  tools: toolsInitState,
};

export const 게임_기본화면: MockStore = {
  common: commonInitState,
  room: {
    ...roomInitState,
    isJoined: true,
    isConnectedSocket: true,
    userInfo: participants[0],
    participants,
  },
  game: {
    ...gameInitState,
    questions: QUESTIONS,
    status: GameStatus.PLAYING,
    time: 60,
  },
  gamePoint: gamePointInitState,
  chat: {
    ...chatInitState,
    chatList,
  },
  tools: toolsInitState,
};

export const 게임_현재페인터: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    painterId: participants[0].userId,
  },
  gamePoint: gamePointInitState,
};

export const 게임_문제푸는사람: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    painterId: participants[1].userId,
  },
  gamePoint: gamePointInitState,
};

export const 게임_정답자표시: MockStore = {
  ...게임_현재페인터,
  gamePoint: {
    ...게임_기본화면.gamePoint,
    correctUsersPoint,
  },
};

export const 게임_라운드완료: MockStore = {
  ...게임_정답자표시,
  game: {
    ...게임_정답자표시.game,
    questions: QUESTIONS,
    status: GameStatus.COMPLETED,
    round: QUESTIONS.length,
    time: 0,
  },
  gamePoint: {
    ...게임_기본화면.gamePoint,
    correctUsersPoint,
  },};

export const 게임_종료: MockStore = {
  ...게임_라운드완료,
  game: {
    ...게임_라운드완료.game,
    status: GameStatus.GAMEOVER,
  },
};

export const 게임_서둘러: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    painterId: participants[1].userId,
    time: 10,
  },
  gamePoint: gamePointInitState,
};
