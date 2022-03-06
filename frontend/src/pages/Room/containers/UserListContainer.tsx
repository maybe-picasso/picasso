import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Avatar, Badge, Text } from '@chakra-ui/react';

interface Props {
  position: 'left' | 'right';
}

const UserListContainer = ({ position = 'left' }: Props) => {
  const { participants } = useSelector(select.room.state);

  return (
    <ul className={`user-list ${position}`}>
      {participants.map(({ userId, nickName }) => {
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
            </Flex>
          </li>
        );
      })}
    </ul>
  );
};

export default UserListContainer;
