import * as workerTimers from 'worker-timers';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';
import { QUESTIONS } from 'constants/index';
import { useGameStatus } from '../hooks';
import { clearWorkerTimer } from 'helpers/timer';
import { drawing } from 'pages/Room/containers/CanvasContainer';
import event from 'core/event';

let timer: ReturnType<typeof workerTimers.setTimeout>;

const useGameHandler = () => {
  const { participants } = useSelector(select.room.state);
  const { time } = useSelector(select.game.state);
  const { isWaiting, isPlaying, isComplete, isGameOver } = useGameStatus();
  const dispatch = useDispatch<Dispatch>();
  const userCount = participants.length;

  // 참여 인원별 게임 상태 핸들링
  useEffect(() => {
    if (userCount >= 2 && isWaiting) {
      dispatch.game.init({ questions: QUESTIONS });
    } else if (userCount <= 1 && !isWaiting) {
      dispatch.game.wait();
    }
  }, [isWaiting, userCount, dispatch]);

  // 게임 진행 시간별 핸들링
  useEffect(() => {
    if (isPlaying) {
      timer = workerTimers.setTimeout(() => {
        if (time === 0) {
          dispatch.game.complete();
        } else {
          dispatch.game.setTime(time - 1);
        }
      }, 1000);
    } else if (isComplete || isGameOver) {
      clearWorkerTimer(timer);
    }

    return () => {
      clearWorkerTimer(timer);
    };
  }, [isPlaying, isComplete, isGameOver, time, dispatch]);

  // 게임 시작시 그리기 클리어
  useEffect(() => {
    if (isPlaying) {
      drawing.clearAll();
    }
  }, [isPlaying]);

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
