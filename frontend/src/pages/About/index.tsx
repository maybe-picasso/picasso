import { Suspense } from 'react';
import { Button } from '@chakra-ui/react';
import { TrackballControls } from '@react-three/drei'; //7.0.1 써 에러x
import { Canvas } from '@react-three/fiber';

import CameraControl from './components/CameraControl';
import Earth from './components/Earth';
import Image3D from './components/Image3D';
import Typo3D from './components/Typo3D';

import './index.scss';

const About = () => {
  return (
    <div className="about-wrap">
      <Canvas camera={{ position: [20, 20, 300], fov: 30 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback={null}>
          <Image3D size={1.2} position={[0, 0.1, 0]} />
          <mesh position={[0, 1.8, 0]}>
            <Typo3D hAlign="left" color={'#0e978c'} size={1.4} children="Picasso" />
          </mesh>

          <Earth radius={2} position={[0, -3.4, 0]} />
          <CameraControl />
        </Suspense>

        <TrackballControls panSpeed={0.4} minDistance={9} maxDistance={40} />
      </Canvas>

      <Button w="200px" h="50px" colorScheme="yellow" size="lg" fontWeight="bold" variant="solid">
        <a href="https://github.com/maybe-picasso/picasso" target="_blank" rel="noreferrer">
          Github
        </a>
      </Button>
    </div>
  );
};

export default About;
