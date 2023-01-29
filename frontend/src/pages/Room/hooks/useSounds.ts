import useSound from 'use-sound';

import 정답효과 from '@/assets/sound/띠리리링.mp3';
import 박수함성 from '@/assets/sound/박수함성.mp3';
import 시간임박 from '@/assets/sound/시간임박.mp3';
import 턴변경 from '@/assets/sound/턴변경.mp3';
import 팡파레 from '@/assets/sound/팡파레.mp3';

const useSounds = () => {
  const [playTurnSound] = useSound(턴변경);
  const [playTimeSound] = useSound(시간임박);
  const [playCorrectSound] = useSound(정답효과);
  const [playCompleteSound] = useSound(팡파레);
  const [playGameOverSound] = useSound(박수함성);

  return {
    playTurnSound,
    playTimeSound,
    playCorrectSound,
    playCompleteSound,
    playGameOverSound,
  };
};

export default useSounds;
