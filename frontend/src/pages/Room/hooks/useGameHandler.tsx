import * as workerTimers from 'worker-timers';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';
import { useGameStatus } from '../hooks';
import { drawing } from 'pages/Room/containers/CanvasContainer';
import { getRandomQuestions } from 'helpers/utils';
import event from 'core/event';

const useGameHandler = () => {
  const { participants } = useSelector(select.room.state);
  const { time, questions, readyUserIdList, painterId } = useSelector(select.game.state);
  const { correctUserList } = useSelector(select.gamePoint.state);
  const { isWaitingPlayer, isWaitingReady, isPlaying } = useGameStatus();
  const dispatch = useDispatch<Dispatch>();
  const userCount = participants.length;
  const isAllUserCorrect = correctUserList.length > 0 && correctUserList.length === participants.length - 1;
  const isAllUserReady = userCount === readyUserIdList.length;
  const newQuestions = useRef(getRandomQuestions()).current;

  // 참여 인원별 게임 상태 핸들링
  useEffect(() => {
    if (userCount >= 2 && isWaitingPlayer) {
      dispatch.game.ready();
    } else if (isWaitingReady && isAllUserReady) {
      dispatch.game.init({});
    } else if (userCount <= 1) {
      if (isWaitingPlayer && !questions.length) {
        dispatch.game.setQuestions(newQuestions);
      } else {
        dispatch.game.wait();
      }
    }
  }, [dispatch, isWaitingPlayer, isWaitingReady, isAllUserReady, userCount, questions, newQuestions]);

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

  // 전체 인원 조기 정답시 처리
  useEffect(() => {
    if (!isAllUserCorrect) {
      return;
    }

    dispatch.game.complete();
  }, [isAllUserCorrect, dispatch]);

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

  // 현재 페인터 나갔을때 처리
  useEffect(() => {
    event.removeAllListeners('leave');
    event.on('leave', (data) => {
      if (data.userInfo.userId === painterId) {
        dispatch.game.breakaway();
        // TODO: 그리기중인 ooo님이 나가셨습니다.
      }
    });
  }, [dispatch, painterId]);
};

export default useGameHandler;
