import { Flex } from '@chakra-ui/react';
import { GameQuestion, GameRound, GameTimer, CompleteContent, GameOverContent } from '../../components';
import { CanvasContainer } from '../../containers';

import { useSelector } from 'react-redux';
import { select } from 'store';
import { GameStatus } from 'types/enums';
import { useMyTurn } from '../../hooks';
import './index.scss';

const GameContentContainer = () => {
  const { participants, userInfo } = useSelector(select.room.state);
  const { status, time, questions, round } = useSelector(select.game.state);
  const { correctUserList } = useSelector(select.gamePoint.state);
  const isVisibleOverlayContent = useSelector(select.game.isVisibleOverlayContent);
  const isCurrectUser = correctUserList.find((user) => user.userId === userInfo?.userId);
  const isMyTurn = useMyTurn();
  const isWaiting = status === GameStatus.WAITING;
  const word = isWaiting ? '연습모드' : questions[round - 1];
  const isBlind = !isWaiting && !isMyTurn && !isCurrectUser;

  return (
    <div className="game-content-container">
      <Flex className="header" justifyContent="space-between">
        <GameTimer timeCount={time} isWaiting={isWaiting} />
        <GameQuestion word={word} isBlind={isBlind} />
        <GameRound round={round} totalRound={questions.length} isWaiting={isWaiting} />
      </Flex>

      <Flex className="body" justifyContent="center" alignItems="center">
        <CanvasContainer />

        {isVisibleOverlayContent && (
          <Flex className="overlay-wrap" justifyContent="center" alignItems="center">
            {status === GameStatus.COMPLETED && <CompleteContent userList={participants} word={word} />}
            {status === GameStatus.GAMEOVER && <GameOverContent userList={participants} />}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default GameContentContainer;
