import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { GameStatus } from 'types/enums';

let timer: ReturnType<typeof setTimeout>;

const useGameHandler = () => {
  const { status, time } = useSelector(select.game.state);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      timer = setTimeout(() => {
        if (time === 0) {
          dispatch.game.nextQuestion({});
        } else {
          dispatch.game.setTime(time - 1);
        }
      }, 1000);
    } else if (status === GameStatus.COMPLETED || status === GameStatus.GAMEOVER) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [status, time, dispatch]);
};

export default useGameHandler;
