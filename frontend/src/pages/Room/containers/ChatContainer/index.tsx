import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import { Flex, Grid, GridItem, IconButton, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

import { sendMessage, SocketMessageType } from 'core/socket';
import event from 'core/event';
import cn from 'classnames';
import './index.scss';

const ChatContainer = () => {
  const { userInfo, participants } = useSelector(select.room.state);
  const { chatList } = useSelector(select.chat.state);
  const dispatch = useDispatch<Dispatch>();
  const listWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

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

    const body = {
      message,
      timestamp,
    };

    sendMessage({
      type: SocketMessageType.Chat,
      body,
    });

    const { userId, nickName } = userInfo;
    dispatch.chat.addChat({
      ...body,
      isMine: true,
      userId,
      nickName,
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
    event.removeAllListeners(SocketMessageType.Chat);
    event.on(SocketMessageType.Chat, onChat);
  }, [onChat]);

  return (
    <Grid h="100%" templateRows="repeat(10, 1fr)" borderRadius={6} overflow={'hidden'}>
      <GridItem rowSpan={9} className="chat-list-wrap" ref={listWrapRef}>
        <ul>
          {chatList.map(({ isMine, nickName, message }, i) => (
            <li className={cn({ mine: isMine })} key={i}>
              <p className="nickname">{nickName}</p>
              <p className="body">{message}</p>
            </li>
          ))}
        </ul>
      </GridItem>
      <GridItem rowSpan={1}>
        <Flex h="100%" alignItems="center" p="10px">
          <InputGroup size="lg">
            <Input
              fontSize="16px"
              bg="#fff"
              pr="4.5rem"
              type="text"
              placeholder="메시지를 입력해주세요!"
              ref={textRef}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
            />
            <InputRightElement width="4rem" mr="4px" justifyContent="flex-end">
              <IconButton
                aria-label="전송"
                size="md"
                bg="gray.300"
                icon={<ArrowUpIcon />}
                onClick={handleSendMessage}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ChatContainer;
