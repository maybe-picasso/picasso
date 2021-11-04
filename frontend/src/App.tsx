import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import Home from 'pages/Home';
import Room from 'pages/Room';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
