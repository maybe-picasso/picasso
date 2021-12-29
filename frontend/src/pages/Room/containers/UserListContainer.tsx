import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Avatar, Badge, Text } from '@chakra-ui/react';
import { clone } from 'lodash-es';

interface Props {
  position: 'left' | 'right';
}

const UserListContainer = ({ position = 'left' }: Props) => {
  const { participants } = useSelector(select.room.state);
  const { chatList } = useSelector(select.chat.state);
  const clonedChatList = clone(chatList).reverse();

  return (
    <ul className={`user-list ${position}`}>
      {participants.map(({ userId, nickName }) => {
        // TODO: userId 처리 및 노출 제어 예정.
        let chatInfo;
        if (chatList.length) {
          chatInfo = clonedChatList.find((data) => data.nickName === nickName) ?? null;
        }

        return (
          <li key={userId}>
            <Flex bg="white" margin={1} padding={2}>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">{nickName}</Text>
                <Badge ml="1" colorScheme="green">
                  점수: 0
                </Badge>
              </Box>

              {chatInfo && <div className="chat-balloon">{chatInfo.message}</div>}
            </Flex>
          </li>
        );
      })}
    </ul>
  );
};

export default UserListContainer;
