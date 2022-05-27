import { Container, Grid, GridItem } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { select } from 'store';

import PageTemplate from 'components/PageTemplate';
import {
  SocketContainer,
  GateContainer,
  HeaderContainer,
  GameContentContainer,
  ChatContainer,
  UserListContainer,
  ToolsContainer,
} from './containers';

import './index.scss';
import { useEffect } from 'react';

const Room = () => {
  const { roomId = '' } = useParams();
  const { isJoined } = useSelector(select.room.state);

  createBreakpoints({
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      const $bodySection = document.querySelector('.body-section');
      const width = window.outerWidth;

      console.log('$bodySection :>> ', $bodySection, width, width / 1.77);

      // $bodySection.
    });
  }, []);

  return (
    <PageTemplate id="room">
      <SocketContainer roomId={roomId} />

      {isJoined ? (
        <Container p={0} maxW="100%" className="joined">
          <Grid h="100vh" templateRows="repeat(16, 1fr)" templateColumns="repeat(15, 1fr)" bg="gray.100">
            <GridItem rowSpan={{ base: 1 }} colSpan={{ base: 15 }} bg="purple.400" className="head-section">
              <HeaderContainer />
            </GridItem>

            <GridItem rowSpan={{ base: 15 }} colSpan={{ base: 15 }} className="body-section">
              <Grid
                w="100%"
                h="100%"
                gap={2}
                padding={2}
                templateRows="repeat(10, 1fr)"
                gridAutoFlow="column"
                justifyContent="center"
              >
                <GridItem rowSpan={{ base: 10 }} colSpan={{ base: 2 }} borderRadius={6} bg="gray.300" w="230px">
                  <UserListContainer />
                </GridItem>

                <GridItem rowSpan={{ base: 10 }} colSpan={{ base: 10 }} borderRadius={6} bg="white">
                  <GameContentContainer />
                </GridItem>

                <GridItem rowSpan={{ base: 10 }} colSpan={{ base: 3 }} w="280px">
                  <Grid h="100%" templateRows="repeat(10, 1fr)" templateColumns="repeat(3, 1fr)" gap={2}>
                    <GridItem rowSpan={2} colSpan={3} borderRadius={6} p="10px" bg="gray.100" minHeight={150}>
                      <ToolsContainer />
                    </GridItem>
                    <GridItem rowSpan={8} colSpan={3} borderRadius={6} bg="gray.300">
                      <ChatContainer />
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      ) : (
        <GateContainer roomId={roomId} />
      )}
    </PageTemplate>
  );
};

export default Room;
