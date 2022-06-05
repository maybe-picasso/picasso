import { Box } from '@chakra-ui/react';

interface Props {
  word: string;
  isBlind: boolean;
}

const GameQuestion = ({ word, isBlind }: Props) => {
  return (
    <Box bg="green.400" minWidth="100px" textAlign="center" fontWeight={600} p={2} color="white" borderRadius="6">
      {isBlind ? Array.from({ length: word.length }).fill(' O ') : word}
    </Box>
  );
};

export default GameQuestion;
