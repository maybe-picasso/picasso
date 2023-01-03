import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import event from 'core/event';
import { sendMessage } from 'core/socket';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';

import { useFirstUser, useGameStatus, useMyTurn } from '../hooks';

/**
 * 입장한 유저 게임 진행 상태 싱크
 */
const useGameSync = () => {
  const { readyUserIdList, time, painterId, status, round, questions } = useSelector(select.game.state);
  const { isPlaying } = useGameStatus();
  const dispatch = useDispatch<Dispatch>();
  const isMyTurn = useMyTurn();
  const isFirstUser = useFirstUser();

  useEffect(() => {
    event.removeAllListeners('join');
    event.on('join', (data) => {
      console.log('[디버깅] join :>> ', data);
      if (isMyTurn || (!isPlaying && isFirstUser)) {
        sendMessage({
          type: SocketMessageType.SYNC_GAME_STATUS,
          to: data.userInfo.userId,
          body: {
            readyUserIdList,
            questions,
            painterId,
            status,
            round,
            time,
          },
        });
      }
    });
  }, [isPlaying, isMyTurn, isFirstUser, readyUserIdList, questions, painterId, round, time, status]);

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.SYNC_GAME_STATUS);
    event.on(SocketMessageType.SYNC_GAME_STATUS, ({ body }) => {
      console.log('[디버깅] SYNC_GAME_STATUS :>> ', body);
      const { readyUserIdList, questions, status, painterId, round, time } = body;

      dispatch.game.setReadyUserIdList(readyUserIdList);
      dispatch.game.setQuestions(questions);
      dispatch.game.setPainterId(painterId);
      dispatch.game.setTime(time);
      dispatch.game.setRound(round);
      dispatch.game.setStatus(status);
    });
  }, [dispatch]);
};

export default useGameSync;
