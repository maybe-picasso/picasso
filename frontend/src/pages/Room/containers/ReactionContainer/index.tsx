import { useCallback, useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames'
import { Center } from '@chakra-ui/react';

import event from '@/core/event';
import { sendMessage } from '@/core/socket';
import { Dispatch, select } from '@/store';
import { SocketMessageType } from '@/types/enums';

import './index.scss';

const REACTION_EMOJIS = [
  '💖',
  '👍',
  '😆',
  '😲',
  '🤔',
  '👎',
  '😱',
]
const ReactionContainer = () => {
  const { reactionList } = useSelector(select.reaction.state);
  const { userInfo } = useSelector(select.room.state);
  const dispatch = useDispatch<Dispatch>();
  const [isFoldPanel, setIsFoldPanel] = useState(true);

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

  const handleReactionPanel = () => {
    setIsFoldPanel(isFoldPanel => !isFoldPanel)
  }

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.REACTION);
    event.on(SocketMessageType.REACTION, onReaction);
  }, [onReaction]);

  return (
    <div className="reaction-wrap">

      <ul>
        {reactionList.map(({ type, nickName }, index) => {
          return (
            <li key={`${nickName}-${index}`}>
              <strong>{type}</strong>
              <Center bg="gray.100" className='user-name'>
                {nickName}
              </Center>
            </li>
          );
        })}
      </ul>

      <Center className={cn('reaction-panel', { fold: isFoldPanel })} bg="gray.200" h="50px" p={"5px 15px"} borderRadius={30}>
        {REACTION_EMOJIS.map((emoji, index) => {
          const isToggleButton = index === 0 && isFoldPanel;
          const handleClick = isToggleButton ? handleReactionPanel : () => sendReaction(emoji)

          return <button type="button" key={index} onClick={handleClick}>{emoji}</button>
        })}
        <button type="button" className='cta-close-panel' onClick={handleReactionPanel}><AiFillCloseCircle /></button>
      </Center >
    </div>
  );
};

export default ReactionContainer;
