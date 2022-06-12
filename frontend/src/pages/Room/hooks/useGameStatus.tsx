import { useSelector } from 'react-redux';
import { select } from 'store';
import { GameStatus } from 'types/enums';

const useGameStatus = () => {
  const { status } = useSelector(select.game.state);
  const isWaiting = status === GameStatus.WAITING;
  const isStandby = status === GameStatus.STANDBY;
  const isPlaying = status === GameStatus.PLAYING;
  const isComplete = status === GameStatus.COMPLETED;
  const isGameOver = status === GameStatus.GAMEOVER;

  return {
    isWaiting,
    isStandby,
    isPlaying,
    isComplete,
    isGameOver,
  };
};

export default useGameStatus;
