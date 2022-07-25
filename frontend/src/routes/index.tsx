import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Room from 'pages/Room';
import About from 'pages/About';
import PATHS from './paths';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.ROOM} element={<Room />} />
      <Route path={PATHS.ABOUT} element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
