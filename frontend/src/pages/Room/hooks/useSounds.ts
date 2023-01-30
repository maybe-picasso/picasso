import { useSelector } from 'react-redux';
import useSound from 'use-sound';

import 정답효과 from '@/assets/sound/띠리리링.mp3';
import 박수함성 from '@/assets/sound/박수함성.mp3';
import 사운드off from '@/assets/sound/사운드off.mp3';
import 사운드on from '@/assets/sound/사운드on.mp3';
import 시간임박 from '@/assets/sound/시간임박.mp3';
import 턴변경 from '@/assets/sound/턴변경.mp3';
import 팡파레 from '@/assets/sound/팡파레.mp3';
import { select } from '@/store';

const useSounds = () => {
  const { soundEnabled } = useSelector(select.room.state);
  const options = { soundEnabled };

  const [playTurnSound] = useSound(턴변경, options);
  const [playTimeSound] = useSound(시간임박, options);
  const [playCorrectSound] = useSound(정답효과, options);
  const [playCompleteSound] = useSound(팡파레, options);
  const [playGameOverSound] = useSound(박수함성, options);
  const [playSoundOn] = useSound(사운드on);
  const [playSoundOff] = useSound(사운드off);

  return {
    playTurnSound,
    playTimeSound,
    playCorrectSound,
    playCompleteSound,
    playGameOverSound,
    playSoundOn,
    playSoundOff,
  };
};

export default useSounds;
