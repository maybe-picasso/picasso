import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './index.scss';

interface Props {
  time?: number;
}

const GameTimer = ({ time = 60 }: Props) => {
  const [timeCount, setTimeCount] = useState(time);

  useEffect(() => {
    if (timeCount === 0) return;
    const timer = setInterval(() => setTimeCount((timeCount) => timeCount - 1), 1000);
    return () => clearInterval(timer);
  }, [timeCount]);

  // 10초 미만시 강조 컬러
  const isNeedSpeedUp = timeCount < 10;
  const isTimeout = timeCount === 0;

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
