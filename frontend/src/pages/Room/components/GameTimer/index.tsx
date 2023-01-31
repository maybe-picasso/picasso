import { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

import './index.scss';

const TIME_TO_SPEED_UP = 10;
const TIME_OUT = 0;

interface Props {
  timeCount?: number;
  isWaitingPlayer: boolean;
  onTimerAlarm?: () => void;
}

const GameTimer = ({ timeCount = 60, isWaitingPlayer, onTimerAlarm }: Props) => {
  const isNeedSpeedUp = timeCount <= TIME_TO_SPEED_UP;
  const isTimeout = timeCount === TIME_OUT;

  useEffect(() => {
    if (isNeedSpeedUp && !isTimeout) {
      onTimerAlarm?.();
    }
  }, [isNeedSpeedUp, isTimeout, onTimerAlarm]);

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
