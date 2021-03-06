import { VStack, Center, Text } from '@chakra-ui/react';
import { PROFILE_CHARACTERS } from 'constants/index';
import { usePainterInfo } from '../../hooks';

const GameStatusContainer = () => {
  const painterInfo = usePainterInfo();
  return (
    <Center height="100%" p={3} bg="gray.500" color="white" borderRadius={6}>
      <VStack>
        {painterInfo ? (
          <>
            <Text fontSize="3xl">๐จ {PROFILE_CHARACTERS[painterInfo.profileIndex]}</Text>
            <Text>{painterInfo.nickName} ๋์ด ๊ทธ๋ฆผ ๊ทธ๋ฆด ์ฐจ๋ก์๋๋ค!</Text>
          </>
        ) : (
          <Text>๊ฒ์ ์ค๋น์ค์๋๋ค.</Text>
        )}
      </VStack>
    </Center>
  );
};

export default GameStatusContainer;
