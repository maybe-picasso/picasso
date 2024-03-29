import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const VEC = new THREE.Vector3();
const STEP_VALUE = 0.2;

const CameraControl = () => {
  const [isAction, setIsAction] = useState(true);

  useFrame((state) => {
    isAction && state.camera.position.lerp(VEC.set(0, 0, 15), STEP_VALUE);
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
