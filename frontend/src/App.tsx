import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import Home from 'pages/Home';
import Room from 'pages/Room';
import Setting from 'pages/Setting';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
