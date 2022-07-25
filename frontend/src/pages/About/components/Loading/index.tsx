import { Html, useProgress } from '@react-three/drei';

import './index.scss';

const Loading = () => {
  const { progress } = useProgress();

  return (
    <Html center className="loading-bar">
      <p className="desc">
        loading...
        <strong>{progress.toFixed(0)}%</strong>
      </p>

      <div className="per" style={{ transform: `scaleY(${progress / 100})` }}></div>
    </Html>
  );
};

export default Loading;
