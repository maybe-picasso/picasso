import { Box, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';

import './index.scss';

const LIMIT_TIME = 90;

const GameTimer = () => {
  const [timeCount, setTimeCount] = useState(LIMIT_TIME);
  const timeFormat = useMemo(() => format(new Date(2022, 1, 1, 1, 0, timeCount), 'mm:ss'), [timeCount]);

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
        <Text fontSize="xl" color={isNeedSpeedUp ? 'red.500' : 'blackAlpha.900'}>
          {timeFormat}
        </Text>
      )}
    </Box>
  );
};

export default GameTimer;
