import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import { theme } from './theme';
import AppRoutes from 'routes';
import ErrorBoundary, { ErrorFallback, errorHandler } from 'components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

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
