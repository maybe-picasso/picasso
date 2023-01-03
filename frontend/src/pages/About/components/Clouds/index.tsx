import { useRef } from 'react';
import { Mesh } from 'three';
import { Sphere, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
interface Props {
  radius: number;
  position?: [number, number, number];
}

const Clouds = ({ radius, position }: Props) => {
  const [earthClouds] = useTexture(['textures/earth-clouds.jpg']);
  const cloudsRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!cloudsRef.current) return;
    cloudsRef.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <Sphere ref={cloudsRef} args={[radius + 0.05, 32, 32]}>
      <meshPhongMaterial transparent alphaMap={earthClouds} opacity={0.5} />
    </Sphere>
  );
};

export default Clouds;
