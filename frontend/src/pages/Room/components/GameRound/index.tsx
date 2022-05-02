import { Box, Text } from '@chakra-ui/react';
import './index.scss';

const GameRound = () => {
  return (
    <Box className="game-round" textAlign="right">
      <Text fontSize="xs" color="blackAlpha.600">
        라운드
      </Text>
      <Text color="blackAlpha.600">
        <Text as="strong" color="blackAlpha.900">
          5
        </Text>{' '}
        / 10
      </Text>
    </Box>
  );
};

export default GameRound;
