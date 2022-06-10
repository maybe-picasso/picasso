import { Box, Text } from '@chakra-ui/react';
import './index.scss';

interface Props {
  round: number;
  totalRound: number;
  isWaiting: boolean;
}

const GameRound = ({ round, totalRound, isWaiting }: Props) => {
  return (
    <Box className="game-round" textAlign="right">
      <Text fontSize="xs" color="blackAlpha.600">
        라운드
      </Text>
      <Text color="blackAlpha.600">
        {isWaiting ? (
          <Text as="strong" color="blackAlpha.900">
            대기중
          </Text>
        ) : (
          <>
            <Text as="strong" color="blackAlpha.900">
              {round}
            </Text>{' '}
            / {totalRound}
          </>
        )}
      </Text>
    </Box>
  );
};

export default GameRound;
