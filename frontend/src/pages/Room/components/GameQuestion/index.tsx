import { Box } from '@chakra-ui/react';

interface Props {
  word: string;
}

const GameQuestion = ({ word }: Props) => {
  return (
    <Box bg="green.400" minWidth="100px" textAlign="center" fontWeight={600} p={2} color="white" borderRadius="6">
      {word}
    </Box>
  );
};

export default GameQuestion;
