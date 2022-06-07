import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import useSound from 'use-sound';

import tickTock from 'assets/sound/tick-tock.mp3';
import './index.scss';

interface Props {
  timeCount?: number;
}

const GameTimer = ({ timeCount = 60 }: Props) => {
  // 10초 미만시 강조 컬러
  const isNeedSpeedUp = timeCount < 10;
  const isTimeout = timeCount === 0;

  const [play, { stop }] = useSound(tickTock, {
    playbackRate: 2,
    interrupt: true,
  });

  useEffect(() => {
    if (isNeedSpeedUp && !isTimeout) {
      play({
        forceSoundEnabled: true,
      });
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [isNeedSpeedUp, isTimeout, play, stop]);

  return (
    <Box className="game-timer">
      <Text className="timer-emoji">⏰</Text>
      {isTimeout ? (
        <Text fontSize="sm" color="gray.500">
          시간초과!
        </Text>
      ) : (
        <Text fontSize="xl" fontWeight={600} color={isNeedSpeedUp ? 'red.500' : 'blackAlpha.900'}>
          {timeCount}
        </Text>
      )}
    </Box>
  );
};

export default GameTimer;
