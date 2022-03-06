import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import { Flex, Grid, GridItem, Textarea, Button } from '@chakra-ui/react';
import { sendMessage, SocketMessageType } from 'modules/socket';
import event from 'modules/event';
import cn from 'classnames';

const ChatContainer = () => {
  const { userInfo, participants } = useSelector(select.room.state);
  const { chatList } = useSelector(select.chat.state);
  const dispatch = useDispatch<Dispatch>();
  const listWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleScrollToBottom = useCallback(() => {
    const $listWrap = listWrapRef.current;
    if (!$listWrap) {
      return;
    }

    $listWrap.scrollTop = $listWrap.scrollHeight;
  }, [listWrapRef]);

  const handleSendMessage = useCallback(() => {
    const message = textRef.current?.value;
    const timestamp = new Date().getTime();

    if (!textRef.current || !message || !userInfo) {
      return;
    }

    const { userId, nickName } = userInfo;
    dispatch.chat.addChat({
      isMine: true,
      userId,
      nickName,
      message,
      timestamp,
    });

    sendMessage({
      type: SocketMessageType.Chat,
      body: message,
    });

    textRef.current.value = '';
    setTimeout(() => handleScrollToBottom(), 0);
  }, [dispatch, userInfo, handleScrollToBottom]);

  const handleKeyUp = useCallback(
    (e) => {
      if (e.shiftKey) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  // NOTE: 한글 마지막 글자 두번 처리되는이슈로 keydown에서도 이벤트 핸들링 필요
  const handleKeyDown = useCallback((e) => {
    if (e.shiftKey) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }, []);

  const findParticipantInfo = useCallback(
    (userId: string) => {
      return participants.find((data) => data.userId === userId);
    },
    [participants]
  );

  const onChat = useCallback(
    ({ senderId, body }) => {
      const { timestamp, message } = body;
      const nickName = findParticipantInfo(senderId)?.nickName ?? null;

      if (nickName) {
        dispatch.chat.addChat({
          userId: senderId,
          nickName,
          timestamp,
          message,
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
    <Grid h="100%" templateRows="repeat(11, 1fr)">
      <GridItem rowSpan={10} bg="gray.100" className="chat-list-wrap" ref={listWrapRef}>
        <ul>
          {chatList.map(({ isMine, nickName, message }, i) => (
            <li className={cn({ mine: isMine })} key={i}>
              <p className="nickname">{nickName}</p>
              <p className="body">{message}</p>
            </li>
          ))}
        </ul>
      </GridItem>
      <GridItem rowSpan={1} className="chat-input-wrap" bg="gray.500">
        <Flex h="100%" justifyContent="space-between">
          <Textarea
            placeholder="메시지를 입력해주세요!"
            background="#fff"
            resize="none"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={textRef}
            maxLength={50}
            borderRadius={0}
          />
          <Button
            w="80px"
            h="100%"
            borderRadius={0}
            colorScheme="yellow"
            variant="solid"
            color="#fff"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ChatContainer;
