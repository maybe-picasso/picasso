import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { GameStatus } from 'types/enums';
import { SocketMessageType } from 'types/enums';
import event from 'core/event';

let timer: ReturnType<typeof setTimeout>;

const useGameHandler = () => {
  const { status, time } = useSelector(select.game.state);
  const dispatch = useDispatch<Dispatch>();

  // 게임 진행 시간별 핸들링
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

  // 정답자 소켓 메시지 핸들링
  useEffect(() => {
    event.removeAllListeners(SocketMessageType.CORRECT_USER);
    event.on(SocketMessageType.CORRECT_USER, ({ body }) => {
      const { userId } = body;
      console.log('SocketMessageType.CORRECT_USER :>> ', userId);
      dispatch.gamePoint.correctUser({ userId });
    });
  }, [dispatch]);
};

export default useGameHandler;
