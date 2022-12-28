import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import { theme } from './theme';
import { queryClient } from 'queries/config';

import AppRoutes from 'routes';
import ErrorBoundary, { ErrorFallback, errorHandler } from 'components/ErrorBoundary';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={errorHandler}
          onReset={() => queryClient.resetQueries()}
        >
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
