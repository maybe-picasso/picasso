import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { PartialDeep } from 'type-fest';
import immerPlugin from '@rematch/immer';
import selectPlugin from '@rematch/select';

import { models, RootModel } from '../../src/store/models';
import { RootState } from '../../src/store';

const storybookStore = (initialState: Partial<RootState>) => {
  return init<RootModel>({
    models,
    redux: { initialState },
    plugins: [immerPlugin(), selectPlugin()],
  });
};

export const withRedux = (initialState: Partial<RootState>) => {
  return (storybookComponent: () => ReactNode) => {
    const store = storybookStore(initialState);
    return <Provider store={store}>{storybookComponent()}</Provider>;
  };
};
