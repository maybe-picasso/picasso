import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';
import { useGameStatus, useMyTurn } from '../hooks';
import { sendMessage } from 'core/socket';
import event from 'core/event';

const useGameSync = () => {
  const { participants } = useSelector(select.room.state);
  const { time, painterId, status, round, questions } = useSelector(select.game.state);
  const { isWaiting } = useGameStatus();
  const dispatch = useDispatch<Dispatch>();
  const isMyTurn = useMyTurn();

  // 입장한 유저 게임 진행 상태 싱크
  useEffect(() => {
    event.removeAllListeners('join');
    event.on('join', (data) => {
      console.log('[디버깅] join :>> ', data);
      if ((!isWaiting && isMyTurn) || participants.length === 1) {
        sendMessage({
          type: SocketMessageType.SYNC_GAME_STATUS,
          to: data.userInfo.userId,
          body: {
            questions,
            painterId,
            status,
            round,
            time,
          },
        });
      }
    });
  }, [isWaiting, isMyTurn, participants, questions, painterId, round, time, status]);

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.SYNC_GAME_STATUS);
    event.on(SocketMessageType.SYNC_GAME_STATUS, ({ body }) => {
      console.log('[디버깅] SYNC_GAME_STATUS :>> ', body);
      const { questions, status, painterId, round, time } = body;

      dispatch.game.setQuestions(questions);
      dispatch.game.setPainterId(painterId);
      dispatch.game.setTime(time);
      dispatch.game.setRound(round);
      dispatch.game.setStatus(status);
    });
  }, [dispatch]);
};

export default useGameSync;
