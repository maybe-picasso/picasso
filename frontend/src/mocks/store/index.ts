import { QUESTIONS as QUESTIONS_ORIGIANL } from '@/constants';
import { RootState } from '@/store';
import { initialState as chatInitState } from '@/store/models/chat';
import { initialState as commonInitState } from '@/store/models/common';
import { initialState as gameInitState } from '@/store/models/game';
import { initialState as gamePointInitState } from '@/store/models/gamePoint';
import { initialState as reactionInitState } from '@/store/models/reaction';
import { initialState as roomInitState } from '@/store/models/room';
import { initialState as toolsInitState } from '@/store/models/tools';
import { GameStatus } from '@/types/enums';
import { chatList } from './chat';
import { correctUserList } from './gamePoint';
import { reactionList } from './reaction';
import { participants } from './room';

const QUESTIONS = QUESTIONS_ORIGIANL.slice(0, 9);

export type MockStore = Pick<RootState, 'common' | 'room' | 'game' | 'gamePoint' | 'chat' | 'tools' | 'reaction'>;

export const 프로필설정: MockStore = {
  common: commonInitState,
  room: roomInitState,
  game: gameInitState,
  gamePoint: gamePointInitState,
  chat: chatInitState,
  tools: toolsInitState,
  reaction: reactionInitState,
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
    time: 30,
  },
  gamePoint: gamePointInitState,
  chat: {
    ...chatInitState,
    chatList,
  },
  tools: toolsInitState,
  reaction: reactionInitState,
};

export const 게임_대기화면: MockStore = {
  ...게임_기본화면,
  room: {
    ...게임_기본화면.room,
    participants: participants.slice(0, 1),
  },
  game: {
    ...게임_기본화면.game,
    status: GameStatus.WAITING_PLAYER,
  },
  gamePoint: gamePointInitState,
};

export const 게임_유저목록로딩: MockStore = {
  ...게임_대기화면,
  room: {
    ...게임_대기화면.room,
    participants: [],
  },
};

export const 게임_플레이어_준비: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    status: GameStatus.WAITING_READY,
    readyUserIdList: [게임_기본화면.room.participants[0].userId, 게임_기본화면.room.participants[1].userId],
  },
};

export const 게임_다음턴안내_출제자: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    status: GameStatus.STANDBY_TURN,
    painterId: participants[0].userId,
  },
};

export const 게임_다음턴안내_플레이어: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    status: GameStatus.STANDBY_TURN,
    painterId: participants[1].userId,
  },
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
  reaction: {
    reactionList,
  },
};

export const 게임_정답자표시: MockStore = {
  ...게임_문제푸는사람,
  gamePoint: {
    ...게임_문제푸는사람.gamePoint,
    correctUserList,
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
    correctUserList,
  },
};

export const 게임_종료: MockStore = {
  ...게임_라운드완료,
  game: {
    ...게임_라운드완료.game,
    status: GameStatus.GAMEOVER,
  },
};

export const 게임_마지막라운드: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    painterId: participants[4].userId,
    round: 10,
    time: 3,
  },
  gamePoint: gamePointInitState,
};

export const 게임_서둘러: MockStore = {
  ...게임_기본화면,
  game: {
    ...게임_기본화면.game,
    painterId: participants[4].userId,
    round: 5,
    time: 10,
  },
  gamePoint: gamePointInitState,
};
