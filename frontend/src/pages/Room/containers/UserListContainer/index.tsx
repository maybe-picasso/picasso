import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Badge, Text } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import './index.scss';

const UserListContainer = () => {
  const { participants } = useSelector(select.room.state);
  const { correctUsersPoint } = useSelector(select.gamePoint.state);

  return (
    <ul className="user-list">
      {participants.map(({ userId, nickName, profileIndex }) => {
        const currectUserInfo = correctUsersPoint.find((users) => users.userId === userId);

        return (
          <li key={userId}>
            <Flex className="profile-wrap" bg="white" margin={2} mb={4} padding={2} borderRadius={6}>
              <ProfileAvatar index={profileIndex} />
              <Box ml="3">
                <Text className="nickname" fontWeight="bold">
                  {nickName}
                </Text>
                <Badge colorScheme={currectUserInfo ? 'green' : 'gray'}>{currectUserInfo?.point ?? 0} points</Badge>
              </Box>
            </Flex>
          </li>
        );
      })}
    </ul>
  );
};

export default UserListContainer;
