import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import { theme } from './theme';
import AppRoutes from 'routes';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppRoutes />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
