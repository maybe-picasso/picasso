import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import { Flex, Box, Textarea, Button } from '@chakra-ui/react';
import { sendMessage, SocketMessageType } from 'modules/socket';
import event from 'modules/event';

const ChatContainer = () => {
  const { userInfo, participants } = useSelector(select.room.state);
  const dispatch = useDispatch<Dispatch>();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = useCallback(() => {
    const message = textRef.current?.value;

    if (!textRef.current || !message) {
      return;
    }

    dispatch.chat.addChat({
      isMine: true,
      nickName: userInfo?.nickName,
      message,
    });

    sendMessage({
      type: SocketMessageType.Chat,
      body: message,
    });

    textRef.current.value = '';
  }, [dispatch, userInfo]);

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
      const nickName = findParticipantInfo(senderId)?.nickName ?? null;
      if (nickName) {
        dispatch.chat.addChat({
          nickName,
          message: body,
        });
      }
    },
    [dispatch, findParticipantInfo]
  );

  useEffect(() => {
    event.removeAllListeners(SocketMessageType.Chat);
    event.on(SocketMessageType.Chat, onChat);
  }, [onChat]);

  return (
    <Box className="chat-input-wrap" padding="5px">
      <Flex h="100%" justifyContent="space-between">
        <Textarea
          placeholder="정답을 입력해주세요!"
          background="#fff"
          resize="none"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          ref={textRef}
          maxLength={60}
        />
        <Button w="80px" h="100%" colorScheme="yellow" variant="solid" color="#fff" onClick={handleSendMessage}>
          Enter
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatContainer;
