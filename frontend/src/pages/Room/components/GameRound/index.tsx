import { Box } from '@chakra-ui/react';
import './index.scss';

const GameRound = () => {
  return (
    <Box w="80px" h="80px" p={5} color="black" bg="white" border="solid 4px tomato" borderRadius={30}>
      5/10
    </Box>
  );
};

export default GameRound;
