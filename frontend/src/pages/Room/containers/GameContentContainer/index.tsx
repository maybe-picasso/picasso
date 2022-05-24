import { Flex } from '@chakra-ui/react';
import { GameQuestion, GameRound, GameTimer, CompleteContent, GameOverContent } from '../../components';
import { CanvasContainer } from '../../containers';

import { useSelector } from 'react-redux';
import { select } from 'store';
import { GameStatus } from 'types/enums';
import './index.scss';

const GameContentContainer = () => {
  const { participants } = useSelector(select.room.state);
  const { status } = useSelector(select.game.state);
  const isVisibleOverlayContent = useSelector(select.game.isVisibleOverlayContent);

  return (
    <div className="game-content-container">
      <Flex className="header" justifyContent="space-between">
        <GameTimer />
        <GameQuestion />
        <GameRound />
      </Flex>

      <Flex className="body" justifyContent="center" alignItems="center">
        <CanvasContainer />

        {isVisibleOverlayContent && (
          <Flex className="overlay-wrap" justifyContent="center" alignItems="center">
            {status === GameStatus.COMPLETED && <CompleteContent userList={participants} />}
            {status === GameStatus.GAMEOVER && <GameOverContent userList={participants} />}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default GameContentContainer;
