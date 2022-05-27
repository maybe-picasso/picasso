import { Box, Heading, Text } from '@chakra-ui/react';
import './index.scss';

interface Props {
  userList: Picasso.UserInfo[];
  word: string;
}

const CompleteContent = ({ userList, word }: Props) => {
  return (
    <Box>
      <Heading mb={5} color="white" textAlign="center">
        정답은
        <Text m={2} color="green.300" as="span" textDecoration="underline">
          {word}
        </Text>
        입니다!
      </Heading>
      <Box width="500px" height="400px" bgColor="white" borderRadius={6} padding={5}>
        라운드별 정답자 득점 목록 노출
        <ul>
          {userList.map(({ nickName }) => (
            <li>{nickName}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default CompleteContent;
