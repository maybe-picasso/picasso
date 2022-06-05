import { useSelector } from 'react-redux';
import { select } from 'store';
import { Box, Heading, Text, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ProfileAvatar } from 'pages/Room/components';

import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
  word: string;
}

const variants = {
  initial: { opacity: 0, y: 30, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const CompleteContent = ({ userList, word }: Props) => {
  const { correctUserList } = useSelector(select.gamePoint.state);
  return (
    <motion.div initial="initial" animate="visible" variants={variants} transition={{ duration: 0.3 }}>
      <Heading mb={5} color="white" textAlign="center">
        정답은
        <Text m={2} color="green.300" as="span" textDecoration="underline">
          {word}
        </Text>
        입니다!
      </Heading>
      <Box bgColor="white" borderRadius={6} padding={6}>
        <ul className="round-result-rank">
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
      </Box>
    </motion.div>
  );
};

export default CompleteContent;
