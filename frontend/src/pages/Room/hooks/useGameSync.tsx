import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';
import { useGameStatus, useMyTurn } from '../hooks';
import { sendMessage } from 'core/socket';
import event from 'core/event';

const useGameSync = () => {
  const { time, painterId, status, round } = useSelector(select.game.state);
  const { isWaiting } = useGameStatus();
  const dispatch = useDispatch<Dispatch>();
  const isMyTurn = useMyTurn();

  // 진행중 입장한 유저 게임 진행 상태 싱크
  useEffect(() => {
    event.removeAllListeners('join');
    event.on('join', (data) => {
      console.log('확인 join :>> ', data);

      if (!isWaiting && isMyTurn) {
        sendMessage({
          type: SocketMessageType.SYNC_GAME_STATUS,
          to: data.userId,
          body: {
            painterId,
            status,
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

      dispatch.game.setPainterId(painterId);
      dispatch.game.setStatus(status);
      dispatch.game.setRound(round);
      dispatch.game.setTime(time);
    });
  }, [dispatch]);
};

export default useGameSync;