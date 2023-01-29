import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JSConfetti from 'js-confetti';
import { Flex } from '@chakra-ui/react';

import { PROFILE_CHARACTERS } from '@/constants';
import event from '@/core/event';
import { sendMessage } from '@/core/socket';
import { Dispatch, select } from '@/store';
import { SocketMessageType } from '@/types/enums';
import {
  CompleteContent,
  GameOverContent,
  GameQuestion,
  GameRound,
  GameTimer,
  NextTurnContent,
  ReadyContent,
} from '../../components';
import { CanvasContainer } from '../../containers';
import { useGameStatus, useMyCorrect, useMyTurn, usePainterInfo, useSounds } from '../../hooks';

import './index.scss';

const jsConfetti = new JSConfetti();
const WAITING_PLAYER_TEXT = '한명 더 들어오면 시작 할 수 있어요!';
const WAITING_READY_TEXT = '곧 게임이 시작됩니다';

const GameContentContainer = () => {
  const dispatch = useDispatch<Dispatch>();
  const { participants, userInfo } = useSelector(select.room.state);
  const { time, questions, round, readyUserIdList } = useSelector(select.game.state);
  const { correctUserList } = useSelector(select.gamePoint.state);
  const isVisibleOverlayContent = useSelector(select.game.isVisibleOverlayContent);
  const isCurrectUser = correctUserList.find((user) => user.userId === userInfo?.userId);

  const { playCorrectSound, playCompleteSound, playGameOverSound } = useSounds();
  const { isWaitingPlayer, isWaitingReady, isStandByTurn, isComplete, isGameOver, isPlaying } = useGameStatus();
  const { profileIndex: painterProfileIndex, nickName: painterNickName } = usePainterInfo();
  const painterName = `${PROFILE_CHARACTERS[painterProfileIndex]} ${painterNickName}`;
  const isMyCorrect = useMyCorrect();
  const isMyTurn = useMyTurn();
  const word = isWaitingPlayer ? WAITING_PLAYER_TEXT : isWaitingReady ? WAITING_READY_TEXT : questions[round - 1];
  const isBlind = !isWaitingPlayer && !isWaitingReady && !isMyTurn && !isCurrectUser;
  const isReadyMe = readyUserIdList.includes(userInfo?.userId ?? '');

  const handleReadyClick = useCallback(() => {
    if (!userInfo?.userId) {
      return;
    }

    dispatch.game.toggleReadyUser({
      userId: userInfo.userId,
    });
  }, [dispatch, userInfo]);

  // 게임 준비 현황 소켓 처리
  useEffect(() => {
    if (!userInfo) {
      return;
    }

    sendMessage({
      type: SocketMessageType.READY_PLAYER,
      body: {
        isReady: isReadyMe,
      },
    });
  }, [isReadyMe, userInfo]);

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.READY_PLAYER);
    event.on(SocketMessageType.READY_PLAYER, ({ senderId, body }: Picasso.SocketMessage) => {
      dispatch.game.toggleReadyUser({ userId: senderId, forceValue: body.isReady });
    });
  }, [dispatch]);

  useEffect(() => {
    if (isPlaying && isMyCorrect) {
      playCorrectSound();
      const myProfileEmoji = PROFILE_CHARACTERS[userInfo?.profileIndex ?? 0];
      jsConfetti.addConfetti({
        emojis: [myProfileEmoji, word, '⭐', '🌈', '✌', '✅'],
      });
    }
  }, [isPlaying, isMyCorrect, userInfo, word, playCorrectSound]);

  useEffect(() => {
    if (isComplete) {
      playCompleteSound();
      return;
    }

    if (isGameOver) {
      playGameOverSound();
      return;
    }
  }, [isComplete, isGameOver, playCompleteSound, playGameOverSound]);

  return (
    <div className="game-content-container">
      <Flex className="header" justifyContent="space-between">
        <GameTimer timeCount={time} isWaitingPlayer={isWaitingPlayer} />
        <GameQuestion word={word} isBlind={isBlind} />
        <GameRound round={round} totalRound={questions.length} isWaitingPlayer={isWaitingPlayer} />
      </Flex>

      <Flex className="body" justifyContent="center" alignItems="center">
        <CanvasContainer />

        {isVisibleOverlayContent && (
          <Flex className="overlay-wrap" justifyContent="center" alignItems="center">
            {isWaitingReady && (
              <ReadyContent
                userList={participants}
                readyUserIdList={readyUserIdList}
                isReadyMe={isReadyMe}
                onReadyClick={handleReadyClick}
              />
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
