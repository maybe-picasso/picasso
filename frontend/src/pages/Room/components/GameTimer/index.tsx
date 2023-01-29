import { useEffect } from 'react';
import useSound from 'use-sound';
import { Box, Text } from '@chakra-ui/react';

import tickTock from '@/assets/sound/삐비동.mp3';

import './index.scss';

interface Props {
  timeCount?: number;
  isWaitingPlayer: boolean;
}

const GameTimer = ({ timeCount = 60, isWaitingPlayer }: Props) => {
  // 10초 미만시 강조 컬러
  const isNeedSpeedUp = timeCount < 10;
  const isTimeout = timeCount === 0;

  const [play, { stop }] = useSound(tickTock, {
    onend: () => {
      console.info('Sound ended!');
    },
  });

  useEffect(() => {
    if (isNeedSpeedUp && !isTimeout) {
      play();
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
          {isWaitingPlayer ? '∞' : timeCount}
        </Text>
      )}
    </Box>
  );
};

export default GameTimer;
