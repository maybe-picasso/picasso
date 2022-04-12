import { useCallback, useRef } from 'react';
import { Flex, Box, Input, Button, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'store';
import { getUuid } from 'helpers/utils';
import socket from 'core/socket';

interface Props {
  roomId: string;
}

const GateContainer = ({ roomId }: Props) => {
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnterRoom = useCallback(() => {
    const nickName = inputRef.current?.value;
    if (!nickName) {
      alert('닉네임을 입력해주세요!');
      return;
    }

    const userInfo = {
      userId: getUuid(),
      nickName,
      profileUrl: 'profileUrl',
    };

    socket.emit('join', { roomId, userInfo });
    dispatch.room.setUserInfo(userInfo);
    dispatch.room.setJoinedState(true);
    window.localStorage.setItem('nickName', nickName);
  }, [dispatch, roomId, inputRef]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnterRoom();
      }
    },
    [handleEnterRoom]
  );

  const defaultNickName = localStorage.getItem('nickName') || '';

  return (
    <Box flex="1" className="gate-container">
      <Flex h="90%" color="white" direction="column" justifyContent="center" alignItems="center">
        <Box w="260px" textAlign="center" color="facebook.900">
          <Text fontSize="xl" mb="5">
            프로필 설정
          </Text>
          <Input
            placeholder="닉네임을 입력해주세요!"
            maxLength={15}
            mb="2"
            size="lg"
            defaultValue={defaultNickName}
            textAlign="center"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            required
          />
          <Button colorScheme="yellow" w="100%" size="lg" onClick={handleEnterRoom}>
            입장하기
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default GateContainer;
