import { Provider } from 'react-redux';
import ErrorBoundary, { ErrorFallback, errorHandler } from 'components/ErrorBoundary';
import AppRoutes from 'routes';
import { ChakraProvider } from '@chakra-ui/react';

import { store } from './store';
import { theme } from './theme';

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
