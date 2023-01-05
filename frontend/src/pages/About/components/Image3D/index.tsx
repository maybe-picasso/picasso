import { useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface Props {
  position?: [number, number, number];
  size?: number;
}

const Image3D = ({ position, size = 1 }: Props) => {
  const ref = useRef<THREE.Mesh>();

  const materialImgs = useTexture([...Array(6)].map((_, i) => `textures/cube${i + 1}.jpg`));

  useFrame(() => {
    ref.current!.rotation.x += 0.005;
    ref.current!.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref} position={position} scale={1}>
      <boxGeometry args={[size, size, size]} />
      {materialImgs.map((material, index) => {
        return <meshBasicMaterial key={index} attachArray="material" map={material} />;
      })}
    </mesh>
  );
};
export default Image3D;
