import { useSelector } from 'react-redux';
import { select } from 'store';
import { Flex, Box, Badge, Text } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import cn from 'classnames';
import './index.scss';

const UserListContainer = () => {
  const { participants } = useSelector(select.room.state);
  const { painterId } = useSelector(select.game.state);
  const { correctUserList } = useSelector(select.gamePoint.state);

  if (!participants.length) {
    return (
      <ul className="user-list">
        {Array.from({ length: 1 }).map((_, index) => (
          <li key={index}>
            <Skeleton height="68px" borderRadius={6} startColor="gray.500" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="user-list-container">
      <ul className="user-list">
        {participants.map(({ userId, nickName, profileIndex, point = 0 }) => {
          const currectUserInfo = correctUserList.find((user) => user.userId === userId);
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
                  <Badge className="point" borderRadius={4} colorScheme={currectUserInfo ? 'green' : 'gray'}>
                    <span>{point}</span> 점
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
