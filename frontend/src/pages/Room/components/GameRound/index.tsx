import { Box, Text } from '@chakra-ui/react';
import './index.scss';

interface Props {
  round: number;
  totalRound: number;
  isWaitingPlayer: boolean;
}

const GameRound = ({ round, totalRound, isWaitingPlayer }: Props) => {
  return (
    <Box className="game-round" textAlign="right">
      <Text fontSize="xs" color="blackAlpha.600">
        라운드
      </Text>
      <Text color="blackAlpha.600">
        {isWaitingPlayer ? (
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
