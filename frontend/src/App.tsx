import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary, { ErrorFallback, errorHandler } from '@/components/ErrorBoundary';
import { queryClient } from '@/queries/config';
import { store } from '@/store';
import { theme } from '@/theme';
import AppRoutes from './routes';

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
