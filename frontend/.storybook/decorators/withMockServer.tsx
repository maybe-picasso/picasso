import { ReactNode } from 'react';
import { action } from '@storybook/addon-actions';
import { setupMockWorker, MswHandlerParam } from '../../src/mocks/mswConfig';

export const withMockServer = (data: MswHandlerParam[]) => {
  return (storybookComponent: () => ReactNode) => {
    setupMockWorker({
      data,
      callback({ name }, { url, search, params, body }, { status, data }) {
        action(`fetch/${name}`)({
          request: {
            url,
            pathParams: params,
            queryParams: search,
            body,
          },
          response: {
            status,
            data,
          },
        });
      },
    });

    return <>{storybookComponent()}</>;
  };
};
