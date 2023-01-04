import { useSelector } from 'react-redux';

import { select } from '@/store';
import { GameStatus } from '@/types/enums';

const useGameStatus = () => {
  const { status } = useSelector(select.game.state);

  return {
    isWaitingPlayer: status === GameStatus.WAITING_PLAYER,
    isWaitingReady: status === GameStatus.WAITING_READY,
    isStandByTurn: status === GameStatus.STANDBY_TURN,
    isPlaying: status === GameStatus.PLAYING,
    isComplete: status === GameStatus.COMPLETED,
    isGameOver: status === GameStatus.GAMEOVER,
  };
};

export default useGameStatus;
