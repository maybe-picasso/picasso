import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../src/queries/config';

export const withReactQuery = () => {
  return (storybookComponent: () => ReactNode) => {
    return <QueryClientProvider client={queryClient}>{storybookComponent()}</QueryClientProvider>;
  };
};
