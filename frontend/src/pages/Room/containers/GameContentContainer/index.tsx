import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import JSConfetti from 'js-confetti';
import {
  GameQuestion,
  GameRound,
  GameTimer,
  ReadyContent,
  NextTurnContent,
  CompleteContent,
  GameOverContent,
} from '../../components';
import { CanvasContainer } from '../../containers';
import { PROFILE_CHARACTERS } from 'constants/index';

import { useSelector } from 'react-redux';
import { select } from 'store';
import { useMyTurn, usePainterInfo, useGameStatus, useMyCorrect } from '../../hooks';
import './index.scss';

const jsConfetti = new JSConfetti();

const GameContentContainer = () => {
  const { participants, userInfo } = useSelector(select.room.state);
  const { time, questions, round, readyUserIds } = useSelector(select.game.state);
  const { correctUserList } = useSelector(select.gamePoint.state);
  const isVisibleOverlayContent = useSelector(select.game.isVisibleOverlayContent);
  const isCurrectUser = correctUserList.find((user) => user.userId === userInfo?.userId);

  const { isWaiting, isReady, isStandByTurn, isComplete, isGameOver, isPlaying } = useGameStatus();
  const { profileIndex: painterProfileIndex, nickName: painterNickName } = usePainterInfo();
  const painterName = `${PROFILE_CHARACTERS[painterProfileIndex]} ${painterNickName}`;
  const isMyCorrect = useMyCorrect();
  const isMyTurn = useMyTurn();
  const word = isWaiting
    ? '한명 더 들어오면 시작 할 수 있어요!'
    : isReady
    ? '곧 게임이 시작됩니다'
    : questions[round - 1];
  const isBlind = !isWaiting && !isReady && !isMyTurn && !isCurrectUser;

  useEffect(() => {
    if (isPlaying && isMyCorrect) {
      const myProfileEmoji = PROFILE_CHARACTERS[userInfo?.profileIndex ?? 0];
      jsConfetti.addConfetti({
        emojis: [myProfileEmoji, word, '⭐', '🌈', '✌', '✅'],
      });
    }
  }, [isPlaying, isMyCorrect, userInfo, word]);

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
            {isReady && (
              <ReadyContent userList={participants} readyUserIds={readyUserIds} onReadyClick={() => alert('ready')} />
            )}
            {isStandByTurn && <NextTurnContent isMyTurn={isMyTurn} word={word} painterName={painterName} />}
            {isComplete && <CompleteContent userList={participants} word={word} />}
            {isGameOver && <GameOverContent userList={participants} />}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default GameContentContainer;
