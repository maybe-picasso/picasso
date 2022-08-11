import { Text, Badge, Button, Center } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import ResultLayer from '../ResultLayer';

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
  readyUserIds: string[];
  onReadyClick: () => void;
}

const ReadyContent = ({ userList, readyUserIds, onReadyClick }: Props) => {
  return (
    <ResultLayer title={<>모두 준비되면 시작합니다!</>}>
      <ul className="result-score">
        {userList.map(({ nickName, userId, profileIndex }) => {
          const isReady = readyUserIds.some((id) => id === userId);
          return (
            <li key={userId}>
              <div className="rank-name">
                <ProfileAvatar size={30} index={profileIndex} />
                <Text m={2} color={isReady ? 'green.400' : 'black'} as="strong">
                  {nickName}
                </Text>
              </div>
              {isReady && (
                <Badge colorScheme={isReady ? 'green' : 'gray'} p="5px 10px" fontSize={14}>
                  <span>준비완료</span>
                </Badge>
              )}
            </li>
          );
        })}
      </ul>

      <Center>
        <Button onClick={onReadyClick}>준비완료</Button>
      </Center>
    </ResultLayer>
  );
};

export default ReadyContent;
