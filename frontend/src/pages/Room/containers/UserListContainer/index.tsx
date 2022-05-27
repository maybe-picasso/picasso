import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Badge, Text } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import cn from 'classnames';
import './index.scss';

const UserListContainer = () => {
  const { participants } = useSelector(select.room.state);
  const { painterId } = useSelector(select.game.state);
  const { correctUsersPoint } = useSelector(select.gamePoint.state);

  return (
    <ul className="user-list">
      {participants.map(({ userId, nickName, profileIndex }) => {
        const currectUserInfo = correctUsersPoint.find((users) => users.userId === userId);
        const isPainter = painterId === userId;

        return (
          <li key={userId}>
            <Flex
              className={cn('profile-wrap', { painter: isPainter })}
              bg="white"
              margin={2}
              mb={4}
              padding={2}
              borderRadius={6}
            >
              <ProfileAvatar index={profileIndex} />
              <Box ml="3" width="100%" overflow="hidden">
                <Text className="nickname" fontWeight="bold">
                  {nickName}
                </Text>
                <Badge className="point" colorScheme={currectUserInfo ? 'green' : 'gray'}>
                  <span>{currectUserInfo?.point ?? 0}</span> 점
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
