import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Avatar, Badge, Text } from '@chakra-ui/react';
import './index.scss';

const UserListContainer = () => {
  const { participants } = useSelector(select.room.state);

  return (
    <ul className={`user-list`}>
      {participants.map(({ userId, nickName }) => {
        return (
          <li key={userId}>
            <Flex bg="white" margin={1} padding={2} borderRadius={6}>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">{nickName}</Text>
                <Badge ml="1" colorScheme="green">
                  0 points
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
