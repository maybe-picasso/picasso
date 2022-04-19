import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

interface Props {
  deps?: React.DependencyList;
}

const useMotion = ({ deps = [] }: Props) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0.5, 1],
      scale: [0.7, 1.1, 1],
      y: [15, -10, 0],
      transition: {
        delay: 1,
        x: { type: 'spring', stiffness: 50, velocity: 50 },
        default: { duration: 0.5 },
      },
    });

    // eslint-disable-next-line
  }, [controls, ...deps]);

  return { controls };
};

export default useMotion;
