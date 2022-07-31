import { Box } from '@chakra-ui/react';

interface Props {
  word: string;
  isBlind: boolean;
}

const GameQuestion = ({ word, isBlind }: Props) => {
  if (!word) {
    return null;
  }

  return (
    <Box
      bg="green.400"
      minWidth="100px"
      textAlign="center"
      fontWeight={600}
      p="10px 20px"
      color="white"
      borderRadius="6"
    >
      {isBlind ? Array.from({ length: word.length }).fill(' _ ') : word}
    </Box>
  );
};

export default GameQuestion;
