import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Badge, Text } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import './index.scss';

const UserListContainer = () => {
  const { participants } = useSelector(select.room.state);

  return (
    <ul className="user-list">
      {participants.map(({ userId, nickName, profileIndex }) => {
        return (
          <li key={userId}>
            <Flex bg="white" margin={1} padding={2} borderRadius={6}>
              <ProfileAvatar index={profileIndex} />
              <Box ml="3">
                <Text fontWeight="bold">{nickName}</Text>
                <Badge colorScheme="green">0 points</Badge>
              </Box>
            </Flex>
          </li>
        );
      })}
    </ul>
  );
};

export default UserListContainer;
