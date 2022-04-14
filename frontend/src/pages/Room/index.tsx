import { Container, Heading, Flex, Grid, GridItem } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { select } from 'store';

import PageTemplate from 'components/PageTemplate';
import {
  SocketContainer,
  GateContainer,
  GameHeaderContainer,
  CanvasContainer,
  ChatContainer,
  UserListContainer,
  ToolsContainer,
} from './containers';

import './index.scss';

const Room = () => {
  const { roomId = '' } = useParams();
  const { isJoined } = useSelector(select.room.state);

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
          <Grid h="100vh" templateRows="repeat(14, 1fr)" templateColumns="repeat(15, 1fr)" bg="gray.600">
            <GridItem rowSpan={{ base: 1 }} colSpan={{ base: 15 }} bg="purple.400" className="head-section">
              <Heading h="100%" paddingLeft={2} fontSize={20} color="#fff">
                Picasso
              </Heading>
            </GridItem>

            <GridItem rowSpan={{ base: 13 }} colSpan={{ base: 15 }}>
              <Grid h="100%" padding={2} templateRows="repeat(10, 1fr)" templateColumns="repeat(15, 1fr)" gap={2}>
                <GridItem rowSpan={{ base: 10 }} colSpan={{ base: 2 }} borderRadius={6} bg="gray.100">
                  <UserListContainer />
                </GridItem>

                <GridItem
                  position="relative"
                  rowSpan={{ base: 10 }}
                  colSpan={{ base: 10 }}
                  borderRadius={6}
                  padding={3}
                  bg="white"
                >
                  <GameHeaderContainer />
                  <CanvasContainer />
                </GridItem>

                <GridItem rowSpan={{ base: 10 }} colSpan={{ base: 3 }}>
                  <Grid h="100%" templateRows="repeat(10, 1fr)" templateColumns="repeat(3, 1fr)" gap={2}>
                    <GridItem rowSpan={2} colSpan={3} borderRadius={6} bg="gray.100">
                      <ToolsContainer />
                    </GridItem>
                    <GridItem rowSpan={8} colSpan={3} borderRadius={6}>
                      <ChatContainer />
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      ) : (
        <Container p={0} maxW="100%" color="white">
          <Flex h="100%">
            <GateContainer roomId={roomId} />
          </Flex>
        </Container>
      )}
    </PageTemplate>
  );
};

export default Room;
