import useSound from 'use-sound';

import 종료 from '@/assets/sound/결말.mp3';
import 성공_발표 from '@/assets/sound/성공_발표.mp3';
import 성공_연주 from '@/assets/sound/성공_연주.mp3';

const useSounds = () => {
  const [playCorrectSound] = useSound(성공_연주);
  const [playCompleteSound] = useSound(성공_발표);
  const [playGameOverSound] = useSound(성공_발표);

  return {
    playCorrectSound,
    playCompleteSound,
    playGameOverSound,
  };
};

export default useSounds;
