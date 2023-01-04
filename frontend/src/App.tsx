import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import ErrorBoundary, { ErrorFallback, errorHandler } from '@/components/ErrorBoundary';
import { store } from '@/store';
import { theme } from '@/theme';
import AppRoutes from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
          <AppRoutes />
        </ErrorBoundary>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
