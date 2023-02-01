import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import event from '@/core/event';
import { sendMessage } from '@/core/socket';
import { Dispatch, select } from '@/store';
import { SocketMessageType } from '@/types/enums';

import './index.scss';

const ReactionContainer = () => {
  const { reactionList } = useSelector(select.reaction.state);
  const { userInfo } = useSelector(select.room.state);
  const dispatch = useDispatch<Dispatch>();

  // 리액션 클릭시 정보 스토어 저장 및 소켓에 정보 전달
  const sendReaction = useCallback(
    (type: string) => {
      if (!type || !userInfo) return;

      const { userId, nickName } = userInfo;
      const timestamp = new Date().getTime();
      const body = {
        type,
        nickName,
        timestamp,
      };

      sendMessage({
        type: SocketMessageType.REACTION,
        body,
      });

      dispatch.reaction.add({
        ...body,
        userId,
      });
    },
    [dispatch, userInfo]
  );

  // 리액션 수신시 스토어 저장
  const onReaction = useCallback(
    ({ senderId, body }) => {
      const { timestamp, type, nickName } = body;

      dispatch.reaction.add({
        userId: senderId,
        nickName,
        type,
        timestamp,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.REACTION);
    event.on(SocketMessageType.REACTION, onReaction);
  }, [onReaction]);

  return (
    <div className="reaction-wrap">
      <ul>
        {reactionList.map(({ type, nickName }) => {
          return (
            <li>
              <span>{nickName}</span>
              <span>({type})</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => sendReaction('TYPE_A')}>리엑션 버튼 TYPE_A</button>
      </div>
    </div>
  );
};

export default ReactionContainer;
