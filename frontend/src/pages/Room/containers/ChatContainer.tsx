import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import { Flex, Box } from '@chakra-ui/react';
import event from 'modules/event';
import cn from 'classnames';

const ChatContainer = () => {
  const { participants } = useSelector(select.room.state);
  const { chatList } = useSelector(select.chat.state);
  const dispatch = useDispatch<Dispatch>();
  const listWrapRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = useCallback(() => {
    const $listWrap = listWrapRef.current;
    if (!$listWrap) {
      return;
    }

    $listWrap.scrollTop = $listWrap.scrollHeight;
  }, [listWrapRef]);

  const findParticipantInfo = useCallback(
    (userId: string) => {
      return participants.find((data) => data.userId === userId);
    },
    [participants]
  );

  const onChat = useCallback(
    ({ senderId, body }) => {
      const nickName = findParticipantInfo(senderId)?.nickName ?? null;
      if (nickName) {
        dispatch.chat.addChat({
          nickName,
          message: body,
        });

        setTimeout(() => handleScrollToBottom(), 0);
      }
    },
    [dispatch, findParticipantInfo, handleScrollToBottom]
  );

  useEffect(() => {
    event.removeAllListeners('chat');
    event.on('chat', onChat);
  }, [onChat]);

  return (
    <Box margin="5px" bg="rgba(255,255,255,0.92)" color="#000" borderRadius="5px" boxShadow="10px">
      <Flex direction="column">
        <Box className="chat-list-wrap" padding="15px 12px 0 12px" ref={listWrapRef}>
          <ul>
            {chatList.map(({ isMine, nickName, message }, i) => (
              <li className={cn({ mine: isMine })} key={i}>
                <p className="nickname">{nickName}</p>
                <p className="body">{message}</p>
              </li>
            ))}
          </ul>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChatContainer;
