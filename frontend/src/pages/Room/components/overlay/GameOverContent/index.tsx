import { useEffect } from 'react';
import { Text, Badge } from '@chakra-ui/react';
import cn from 'classnames';
import confetti from 'canvas-confetti';

import { ProfileAvatar } from 'pages/Room/components';
import { useSelector } from 'react-redux';
import { select } from 'store';

import ResultLayer from '../ResultLayer'

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
}

const GameOverContent = ({ userList }: Props) => {
  const { correctUsersPoint } = useSelector(select.gamePoint.state);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 150,
      zIndex: 1000,
    });
  }, [])

  return (
    <ResultLayer
      title="🎉 순위를 발표합니다!">

      <ul className="result-score">
        {userList.map(({ nickName, userId, profileIndex }, index) => {
          const currectUserInfo = correctUsersPoint.find((users) => users.userId === userId);
          const isFirstUser = index === 0;
          const isSecondUser = index === 1;
          const isThirdUser = index === 2;

          return (
            <li key={userId} className={cn({ winner: isFirstUser })}>
              <div className="rank-name">
                <span className='medal'>
                  {isFirstUser && '🏅'} {isSecondUser && '🥈'}  {isThirdUser && '🥉'}
                </span>
                <div className="avatar-wrap">
                  <ProfileAvatar size={25} index={profileIndex} />
                  {isFirstUser &&
                    <span className='crown'>
                      👑
                    </span>
                  }
                </div>
                <Text m={2} color='black' as="strong">
                  {nickName} {isFirstUser && '🎉'}
                </Text>
              </div>
              <Badge className="rank-score" colorScheme='gray'>
                <span>{currectUserInfo?.point ?? 0}</span> 점
              </Badge>
            </li>
          );
        })}
      </ul>
    </ResultLayer>
  );
};

export default GameOverContent;
