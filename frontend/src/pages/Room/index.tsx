import { Container, Grid, GridItem, useBreakpoint } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import cn from 'classnames';

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
                templateColumns="repeat(10, 1fr)"
                gridAutoFlow={{ base: "row", lg: "column" }}
                justifyContent="center"
              >
                <GridItem rowSpan={{ base: 1, lg: 10 }} colSpan={{ base: 10, lg: 2 }} borderRadius={6} bg="gray.300" minWidth="230px">
                  <UserListContainer />
                  {!isNodeProdcution && <DevLogContainer />}
                </GridItem>

                <GridItem rowSpan={{ base: 4, lg: 10 }} colSpan={{ base: 10, lg: 6 }} borderRadius={6} bg="white">
                  <GameContentContainer />
                </GridItem>

                <GridItem rowSpan={{ base: 5, lg: 10 }} colSpan={{ base: 10, lg: 2 }} minWidth="280px">
                  <Grid h="100%" templateRows="repeat(10, 1fr)" templateColumns="repeat(3, 1fr)" gap={2}>
                    <GridItem rowSpan={2} colSpan={3} bg="gray.100" minHeight={{ base: 90, lg: 150 }} className={cn({ "hide-status": !(isMyTurn || isWaiting) })}>
                      {isMyTurn || isWaiting ? <ToolsContainer /> : <GameStatusContainer />}
                    </GridItem>
                    <GridItem rowSpan={{ base: 10, lg: 8 }} colSpan={3} borderRadius={6} bg="gray.300">
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
