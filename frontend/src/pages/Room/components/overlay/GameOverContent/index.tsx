import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import cn from 'classnames';
import { orderBy } from 'lodash-es';
import { ProfileAvatar } from 'pages/Room/components';
import { Badge,Text } from '@chakra-ui/react';

import ResultLayer from '../ResultLayer';

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
}

const GameOverContent = ({ userList }: Props) => {
  const userScoreList = orderBy(userList, 'point', 'desc');

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 150,
      zIndex: 1000,
    });
  }, []);

  return (
    <ResultLayer title="🎉 순위를 발표합니다!">
      <ul className="result-score">
        {userScoreList.map(({ nickName, userId, profileIndex, point }, index) => {
          const isFirstUser = index === 0;
          const isSecondUser = index === 1;
          const isThirdUser = index === 2;
          const isTop3 = isFirstUser || isSecondUser || isThirdUser;

          return (
            <li key={userId} className={cn({ winner: isFirstUser })}>
              <div className="rank-name">
                <span className="medal">
                  {isFirstUser && '🏅'} {isSecondUser && '🥈'} {isThirdUser && '🥉'}
                </span>
                <div className="avatar-wrap">
                  <ProfileAvatar size={25} index={profileIndex} />
                  {isFirstUser && <span className="crown">👑</span>}
                </div>
                <Text m={2} color="black" as="strong">
                  {nickName} {isFirstUser && '🎉'}
                </Text>
              </div>
              <Badge className="rank-score" colorScheme={isTop3 ? 'green' : 'gray'}>
                <span>{point}</span> 점
              </Badge>
            </li>
          );
        })}
      </ul>
    </ResultLayer>
  );
};

export default GameOverContent;
