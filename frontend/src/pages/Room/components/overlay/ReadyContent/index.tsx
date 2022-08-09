import { Text, Badge, Button, Center } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import ResultLayer from '../ResultLayer';

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
  readyUserIds: string[];
}

const ReadyContent = ({ userList, readyUserIds }: Props) => {
  return (
    <ResultLayer title={<>모두 준비되면 시작됩니다!</>}>
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
              <Badge colorScheme={isReady ? 'green' : 'gray'} p="5px 10px" fontSize={14}>
                <span>{isReady ? '준비완료' : '준비'}</span>
              </Badge>
            </li>
          );
        })}
      </ul>

      <Center>
        <Button>준비</Button>
      </Center>
    </ResultLayer>
  );
};

export default ReadyContent;
