import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import { Flex, Box, Avatar, Badge, Text } from '@chakra-ui/react';
import event from 'modules/event';

interface Props {
  position: 'left' | 'right';
}

const UserListContainer = ({ position = 'left' }: Props) => {
  const { participants } = useSelector(select.room.state);
  const dispatch = useDispatch<Dispatch>();

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
    event.removeAllListeners('chat');
    event.on('chat', onChat);
  }, [onChat]);

  return (
    <ul className={`user-list ${position}`}>
      {participants.map(({ nickName }) => {
        return (
          <li>
            <Flex bg="white" margin={1} padding={2}>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">{nickName}</Text>
                <Badge ml="1" colorScheme="green">
                  점수: 0
                </Badge>
              </Box>
            </Flex>
          </li>
        );
      })}
    </ul>
  );
};

export default UserListContainer;
