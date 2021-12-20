import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Avatar, Badge, Text } from '@chakra-ui/react';

const UserListContainer = () => {
  const { participants } = useSelector(select.room.state);

  return (
    <div>
      <Text>참여자목록 ({participants.length})</Text>
      <ul>
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
    </div>
  );
};

export default UserListContainer;
