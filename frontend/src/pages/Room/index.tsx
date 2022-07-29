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
  GameStatusContainer,
  ChatContainer,
  UserListContainer,
  ToolsContainer,
  DevLogContainer,
} from './containers';
import { useMyTurn, useGameHandler, useGameSync, useGameStatus } from './hooks';
import { isNodeProdcution } from 'helpers/env';
import './index.scss';

const Room = () => {
  const { roomId = '' } = useParams();
  const { isJoined } = useSelector(select.room.state);
  const { isWaiting } = useGameStatus();
  const isMyTurn = useMyTurn();
  useGameHandler();
  useGameSync();

  createBreakpoints({
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  });

  return (
    <PageTemplate id="room">
      <SocketContainer roomId={roomId} />

      {isJoined ? (
        <Container p={0} maxW="100%" className="joined">
          <Grid h="100vh" templateRows={{ base: "50px 1fr", lg: "60px 1fr" }} bg="gray.100">
            <GridItem bg="purple.400" className="head-section">
              <HeaderContainer />
            </GridItem>

            <GridItem className="body-section">
              <Grid
                w="100%"
                h="100%"
                gap={2}
                padding={2}
                templateRows={{ base: "auto 1fr 330px", lg: "1fr" }}
                templateColumns={{ base: "1fr", lg: "230px 1fr 280px" }}
                gridAutoFlow="column"
                justifyContent="center"
              >
                <GridItem borderRadius={6} bg={{ base: "", lg: "gray.300" }} >
                  <UserListContainer />
                  {!isNodeProdcution && <DevLogContainer />}
                </GridItem>

                <GridItem borderRadius={6} bg="white">
                  <GameContentContainer />
                </GridItem>

                <GridItem >
                  <Grid h="100%" templateRows="repeat(10, 1fr)" templateColumns="repeat(3, 1fr)" gap={2}>
                    <GridItem rowSpan={2} colSpan={3} bg="gray.100" minHeight={150}>
                      {isMyTurn || isWaiting ? <ToolsContainer /> : <GameStatusContainer />}
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
