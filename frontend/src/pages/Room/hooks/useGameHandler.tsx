import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { GameStatus, SocketMessageType } from 'types/enums';
import { QUESTIONS } from 'constants/index';
import { drawing } from '../containers/CanvasContainer';
import event from 'core/event';

let timer: ReturnType<typeof setTimeout>;

const useGameHandler = () => {
  const { participants } = useSelector(select.room.state);
  const { status, time } = useSelector(select.game.state);
  const dispatch = useDispatch<Dispatch>();
  const userCount = participants.length;

  // 참여 인원별 게임 상태 핸들링
  useEffect(() => {
    if (userCount >= 2 && status === GameStatus.WAITING) {
      dispatch.game.init({ questions: QUESTIONS });
      // TODO: 페인터 문제 안내 작업 예정
      console.log('3초뒤 플레이됩니다.');
      setTimeout(() => {
        dispatch.game.play();
      }, 3000);
    } else if (userCount <= 1 && status !== GameStatus.WAITING) {
      dispatch.game.wait();
    }
  }, [userCount, status, dispatch]);

  // 게임 진행 시간별 핸들링
  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      timer = setTimeout(() => {
        if (time === 0) {
          dispatch.game.nextQuestion({});
          drawing.clearAll();
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
