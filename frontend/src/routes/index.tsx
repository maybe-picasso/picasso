import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from '@loadable/component';

import PageFallback from '@/components/PageFallback';
import PATHS from './paths';

const Home = lazy(() => import('@/pages/Home'));
const Room = lazy(() => import('@/pages/Room'));
const About = lazy(() => import('@/pages/About'));

const AppRoutes = () => {
  useEffect(() => {
    Room.preload();
  }, []);

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.ROOM} element={<Room />} />
        <Route path={PATHS.ABOUT} element={<About />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
