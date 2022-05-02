import { Flex } from '@chakra-ui/react';
import { GameQuestion, GameRound, GameTimer } from '../../components';
import './index.scss';

const GameHeaderContainer = () => {
  return (
    <Flex className="game-header-container" justifyContent="space-between">
      <GameTimer />
      <GameQuestion />
      <GameRound />
    </Flex>
  );
};

export default GameHeaderContainer;
