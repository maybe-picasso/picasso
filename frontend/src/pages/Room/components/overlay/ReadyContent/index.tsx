import { ProfileAvatar } from 'pages/Room/components';
import { Badge, Button, Center, Divider,Text } from '@chakra-ui/react';

import ResultLayer from '../ResultLayer';

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
  readyUserIdList: string[];
  isReadyMe: boolean;
  onReadyClick: () => void;
}

const ReadyContent = ({ userList, readyUserIdList, isReadyMe, onReadyClick }: Props) => {
  return (
    <ResultLayer title={<>모두 준비되면 시작합니다!</>}>
      <ul className="result-score ready-content">
        {userList.map(({ nickName, userId, profileIndex }) => {
          const isReady = readyUserIdList.some((id) => id === userId);
          return (
            <li key={userId}>
              <div className="rank-name">
                <ProfileAvatar size={30} index={profileIndex} />
                <Text m={2} color={isReady ? 'green.400' : 'black'} as="strong">
                  {nickName}
                </Text>
              </div>
              {isReady && (
                <Badge colorScheme="green" p="5px 10px" fontSize={14}>
                  <span>준비완료</span>
                </Badge>
              )}
            </li>
          );
        })}
      </ul>

      <Divider m={'20px 0'} />
      <Center>
        <Button onClick={onReadyClick}>{isReadyMe ? '취소' : '준비완료'}</Button>
      </Center>
    </ResultLayer>
  );
};

export default ReadyContent;
