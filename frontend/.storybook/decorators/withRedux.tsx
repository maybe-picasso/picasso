import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import selectPlugin from '@rematch/select';
import { models, RootModel } from '../../src/store/models';
import { MockStore } from 'mocks/store';

const storybookStore = (initialState: MockStore) => {
  return init<RootModel>({
    models,
    redux: { initialState },
    plugins: [immerPlugin(), selectPlugin()],
  });
};

export const withRedux = (initialState: MockStore) => {
  return (storybookComponent: () => ReactNode) => {
    const store = storybookStore(initialState);
    return <Provider store={store}>{storybookComponent()}</Provider>;
  };
};
