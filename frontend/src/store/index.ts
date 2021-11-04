import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';
import immerPlugin from '@rematch/immer';
import selectPlugin from '@rematch/select';

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin(), selectPlugin()],
});

// REF: https://rematchjs.org/docs/plugins/select/#3-selector-examples
export const { select } = store;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
