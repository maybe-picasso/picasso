import { Models } from '@rematch/core';

import { chat } from './chat';
import { common } from './common';
import { game } from './game';
import { gamePoint } from './gamePoint';
import { reaction } from './reaction';
import { room } from './room';
import { tools } from './tools';

export interface RootModel extends Models<RootModel> {
  common: typeof common;
  room: typeof room;
  game: typeof game;
  gamePoint: typeof gamePoint;
  chat: typeof chat;
  reaction: typeof reaction;
  tools: typeof tools;
}

export const models: RootModel = {
  common,
  room,
  game,
  gamePoint,
  chat,
  reaction,
  tools,
};
