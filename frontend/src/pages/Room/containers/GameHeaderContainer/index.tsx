import { Flex, Spacer } from '@chakra-ui/react';
import { GameRound, GameTimer } from '../../components';
import './index.scss';

const GameHeaderContainer = () => {
  return (
    <Flex className="game-header-container">
      <GameTimer />
      <Spacer />
      <GameRound />
    </Flex>
  );
};

export default GameHeaderContainer;
