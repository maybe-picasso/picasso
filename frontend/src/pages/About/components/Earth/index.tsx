import { useRef } from 'react';
import * as THREE from 'three';
import { Color } from 'three';
import { Sphere, Stars, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import Clouds from '../Clouds';

interface Props {
  radius: number;
  position?: [number, number, number];
}

const Earth = ({ radius = 1, position }: Props) => {
  const ref = useRef<THREE.Mesh>();

  const [earthSpecular] = useTexture(['textures/earth-specular.jpg']);

  useFrame(() => {
    ref.current!.rotation.y += 0.001;
  });

  return (
    <group ref={ref} position={position} scale={1}>
      <Clouds radius={radius} />
      <Sphere args={[radius, 32, 32]}>
        <meshPhongMaterial
          attach="material"
          color="#489396"
          shininess={5}
          map={earthSpecular}
          specularMap={earthSpecular}
          specular={new Color('#2BC6CF')}
        />
      </Sphere>
      <Stars radius={100} depth={50} count={3000} factor={6} saturation={0} fade />
    </group>
  );
};

export default Earth;
