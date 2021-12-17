import { Models } from '@rematch/core';
import { common } from './common';
import { room } from './room';
import { chat } from './chat';

export interface RootModel extends Models<RootModel> {
  common: typeof common;
  room: typeof room;
  chat: typeof chat;
}

export const models: RootModel = { common, room, chat };
