import * as workerTimers from 'worker-timers';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';
import { QUESTIONS } from 'constants/index';
import { useGameStatus, useMyTurn } from '../hooks';
import { drawing } from 'pages/Room/containers/CanvasContainer';
import event from 'core/event';
import { sendMessage } from 'core/socket';

const useGameHandler = () => {
  const { participants } = useSelector(select.room.state);
  const { time, painterId, status, round } = useSelector(select.game.state);
  const { isWaiting, isPlaying } = useGameStatus();
  const dispatch = useDispatch<Dispatch>();
  const userCount = participants.length;
  const isMyTurn = useMyTurn();

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
    if (!isPlaying) {
      return;
    }

    workerTimers.setTimeout(() => {
      if (time === 0) {
        dispatch.game.complete();
      } else {
        dispatch.game.setTime(time - 1);
      }
    }, 1000);
  }, [isPlaying, time, dispatch]);

  // 게임 시작시 그리기 클리어
  useEffect(() => {
    if (isPlaying && drawing) {
      drawing.clearAll();
    }
  }, [isPlaying]);

  // 정답자 소켓 메시지 핸들링
  useEffect(() => {
    event.removeAllListeners(SocketMessageType.CORRECT_USER);
    event.on(SocketMessageType.CORRECT_USER, ({ body }) => {
      const { userId } = body;
      dispatch.gamePoint.correctUser({ userId });
    });
  }, [dispatch]);

  // 진행중 입장한 유저 게임 진행 상태 싱크
  useEffect(() => {
    event.removeAllListeners('join');
    event.on('join', (data) => {
      console.log('확인 join :>> ', data);
      if (!isWaiting && isMyTurn) {
        sendMessage({
          type: SocketMessageType.SYNC_GAME_STATUS,
          body: {
            status,
            painterId,
            round,
            time,
          },
        });
      }
    });
  }, [isWaiting, isMyTurn, painterId, round, time, status]);

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.SYNC_GAME_STATUS);
    event.on(SocketMessageType.SYNC_GAME_STATUS, ({ body }) => {
      console.log('확인 SYNC_GAME_STATUS :>> ', body);
      const { status, painterId, round, time } = body;

      dispatch.game.setStatus(status);
      dispatch.game.setPainterId(painterId);
      dispatch.game.setRound(round);
      dispatch.game.setTime(time);
    });
  }, [dispatch]);
};

export default useGameHandler;
