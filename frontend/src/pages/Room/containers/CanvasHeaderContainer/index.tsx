import { Flex } from '@chakra-ui/react';
import { GameQuestion, GameRound, GameTimer } from '../../components';
import './index.scss';

const CanvasHeaderContainer = () => {
  return (
    <Flex className="canvas-header-container" justifyContent="space-between">
      <GameTimer />
      <GameQuestion />
      <GameRound />
    </Flex>
  );
};

export default CanvasHeaderContainer;
