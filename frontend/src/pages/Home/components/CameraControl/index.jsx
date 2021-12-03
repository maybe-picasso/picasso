import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const CameraControl = () => {
  const vec = new THREE.Vector3();
  const step = 0.06;
  const [isAction, setIsAction] = useState(true);

  useFrame((state) => {
    isAction && state.camera.position.lerp(vec.set(0, 0, 12), step);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAction(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return <mesh />;
};

export default CameraControl;
