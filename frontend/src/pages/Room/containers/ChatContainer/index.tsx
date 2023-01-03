import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import cn from 'classnames';
import event from 'core/event';
import { sendMessage } from 'core/socket';
import { Dispatch, select } from 'store';
import { SocketMessageType } from 'types/enums';
import { ArrowDownIcon,ArrowUpIcon } from '@chakra-ui/icons';
import { Flex, Grid, GridItem, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import './index.scss';

const ChatContainer = () => {
  const { userInfo, participants } = useSelector(select.room.state);
  const { chatList } = useSelector(select.chat.state);
  const dispatch = useDispatch<Dispatch>();
  const chatListRef = useRef<HTMLUListElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const [hasScrollChat, setHasScrollChat] = useState(false);
  const [isHideScrollbar, setIsHideScrollbar] = useState(false);

  const handleScrollToBottom = useCallback(() => {
    const $chatList = chatListRef.current;
    if (!$chatList) {
      return;
    }

    $chatList.scrollTop = $chatList.scrollHeight;
  }, [chatListRef]);

  const handleScrollChat = () => {
    if (!chatListRef.current) return;
    const { scrollHeight, scrollTop, clientHeight } = chatListRef.current;
    const isScrollUp = scrollHeight !== Math.ceil(scrollTop + clientHeight);
    setHasScrollChat(isScrollUp);
  };

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
      type: SocketMessageType.CHAT,
      body,
    });

    const { userId, nickName } = userInfo;
    dispatch.chat.addChat({
      ...body,
      isMine: true,
      userId,
      nickName,
    });
    dispatch.game.checkUserAnswer({
      userId,
      text: message.trim(),
    });

    textRef.current.value = '';
    setIsHideScrollbar(true);
    setTimeout(() => {
      handleScrollToBottom();
      setIsHideScrollbar(false);
    }, 0);
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

        // 위로 스크롤중이라면 상대방 메시지가 왔을때 스크롤 아래로 이동하는 액션 제외
        if (!hasScrollChat) {
          handleScrollToBottom();
        }
      }
    },
    [dispatch, findParticipantInfo, handleScrollToBottom, hasScrollChat]
  );

  useEffect(() => {
    window.addEventListener('resize', handleScrollChat);
    return () => window.removeEventListener('resize', handleScrollChat);
  }, []);

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.CHAT);
    event.on(SocketMessageType.CHAT, onChat);
  }, [onChat]);

  return (
    <Grid h="100%" templateRows="repeat(10, 1fr)" borderRadius={6} overflow={'hidden'}>
      <GridItem rowSpan={9} className="chat-list-wrap">
        <ul ref={chatListRef} onScroll={handleScrollChat} className={cn({ 'hide-scrollbar': isHideScrollbar })}>
          {chatList.map(({ nickName, message, isMine, isSystem }, i) => (
            <li className={cn({ mine: isMine, system: isSystem })} key={i}>
              <p className="nickname">{nickName}</p>
              <p className="body">{message}</p>
            </li>
          ))}
        </ul>
        {hasScrollChat && (
          <IconButton
            aria-label="최신 대화보기"
            size="md"
            borderRadius={100}
            colorScheme="teal"
            boxShadow="xl"
            icon={<ArrowDownIcon />}
            onClick={handleScrollToBottom}
          />
        )}
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
