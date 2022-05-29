import { Box } from '@chakra-ui/react';

interface Props {
  word: string;
  isMyTurn: boolean;
}

const GameQuestion = ({ word, isMyTurn }: Props) => {
  return (
    <Box bg="green.400" minWidth="100px" textAlign="center" fontWeight={600} p={2} color="white" borderRadius="6">
      {isMyTurn ? word : Array.from({ length: word.length }).fill(' O ')}
    </Box>
  );
};

export default GameQuestion;
