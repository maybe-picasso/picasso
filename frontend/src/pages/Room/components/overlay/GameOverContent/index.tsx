import { Box, Heading } from '@chakra-ui/react';
import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
}

const GameOverContent = ({ userList }: Props) => {
  return (
    <Box>
      <Heading mb={5} color="white" textAlign="center">
        순위를 발표합니다!
      </Heading>
      <Box width="500px" height="400px" bgColor="white" borderRadius={6} padding={5}>
        전체 라운드 종료후 순위 노출
      </Box>
    </Box>
  );
};

export default GameOverContent;
