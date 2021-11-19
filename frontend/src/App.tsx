import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import Home from 'pages/Home';
import Room from 'pages/Room';
import Setting from 'pages/Setting';
import PracticeRoom from 'pages/PracticeRoom';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/practice-room" element={<PracticeRoom />} />
        </Routes>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
