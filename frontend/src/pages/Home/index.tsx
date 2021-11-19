import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Center, Button, VStack } from '@chakra-ui/react';
import BG_IMG from 'assets/img/bg-home.png';

import './index.scss';

const roomId = 'abc';
const Home = () => {
  const navigate = useNavigate();
  const enterRoom = useCallback(() => {
    navigate(`/room/${roomId}`);
  }, [navigate]);

  return (
    <Center h="80vh" color="white">
      <VStack>
        <Box w="300px" color="white" textAlign="center">
          <img src={BG_IMG} alt="피카소" />
          <Button w="260px" colorScheme="yellow" size="lg" variant="solid" onClick={enterRoom}>
            START
          </Button>
        </Box>
      </VStack>
    </Center>
  );
};

export default Home;
