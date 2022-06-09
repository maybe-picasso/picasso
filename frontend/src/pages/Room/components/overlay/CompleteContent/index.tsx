import { useSelector } from 'react-redux';
import { select } from 'store';
import { Text, Badge } from '@chakra-ui/react';
import { ProfileAvatar } from 'pages/Room/components';
import ResultLayer from '../ResultLayer';

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
  word: string;
}

const CompleteContent = ({ userList, word }: Props) => {
  const { correctUserList } = useSelector(select.gamePoint.state);

  return (
    <ResultLayer
      title={
        <>
          정답은
          <Text m={2} color="green.300" as="span" textDecoration="underline">
            {word}
          </Text>
          입니다!
        </>
      }
    >
      <ul className="result-score">
        {userList.map(({ nickName, userId, profileIndex }) => {
          const currectUserInfo = correctUserList.find((user) => user.userId === userId);
          return (
            <li key={userId}>
              <div className="rank-name">
                <ProfileAvatar size={20} index={profileIndex} />
                <Text m={2} color={currectUserInfo ? 'green.400' : 'black'} as="strong">
                  {nickName} {currectUserInfo && '🎉'}
                </Text>
              </div>
              <Badge className="rank-score" colorScheme={currectUserInfo ? 'green' : 'gray'}>
                <span>{currectUserInfo?.point ?? 0}</span> 점
              </Badge>
            </li>
          );
        })}
      </ul>
    </ResultLayer>
  );
};

export default CompleteContent;
