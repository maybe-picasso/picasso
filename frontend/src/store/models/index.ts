import { Models } from '@rematch/core';
import { common } from './common';
import { room } from './room';
import { game } from './game';
import { gamePoint } from './gamePoint';
import { chat } from './chat';
import { tools } from './tools';

export interface RootModel extends Models<RootModel> {
  common: typeof common;
  room: typeof room;
  game: typeof game;
  gamePoint: typeof gamePoint;
  chat: typeof chat;
  tools: typeof tools;
}

export const models: RootModel = { common, room, game, gamePoint, chat, tools };
