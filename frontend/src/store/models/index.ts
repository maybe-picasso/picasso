import { Models } from '@rematch/core';
import { common } from './common';
import { room } from './room';

export interface RootModel extends Models<RootModel> {
  common: typeof common;
  room: typeof room;
}

export const models: RootModel = { common, room };
