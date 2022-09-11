import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy } from '@loadable/component';
import PATHS from './paths';

import { Spinner } from '@chakra-ui/react';

const Home = lazy(() => import('pages/Home'));
const Room = lazy(() => import('pages/Room'));
const About = lazy(() => import('pages/About'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.ROOM} element={<Room />} />
        <Route path={PATHS.ABOUT} element={<About />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
