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
            <Text fontSize="3xl">🎨 {PROFILE_CHARACTERS[painterInfo.profileIndex]}</Text>
            <Text>{painterInfo.nickName} 님이 그림을 그리고 있습니다.</Text>
          </>
        ) : (
          <Text>게임 준비중입니다.</Text>
        )}
      </VStack>
    </Center>
  );
};

export default GameStatusContainer;
