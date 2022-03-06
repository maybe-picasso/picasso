import { Container, Heading, Flex, Grid, GridItem } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { select } from 'store';

import PageTemplate from 'components/PageTemplate';
import { SocketContainer, GateContainer, CanvasContainer, ChatContainer, UserListContainer } from './containers';

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
          <Grid h="100vh" templateRows="repeat(12, 1fr)" templateColumns="repeat(10, 1fr)" gap={2}>
            <GridItem rowSpan={{ base: 1 }} colSpan={{ base: 10 }} bg="tomato">
              <Heading mt={1} mb={1} textAlign="center" fontSize={20} color="#000">
                room/{roomId}
              </Heading>
            </GridItem>

            <GridItem rowSpan={{ base: 11 }} colSpan={{ base: 2 }} bg="gray.600">
              <UserListContainer position="left" />
            </GridItem>

            <GridItem rowSpan={{ base: 11 }} colSpan={{ base: 6 }} bg="white">
              <Grid h="100%" templateRows="repeat(10, 1fr)" templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem rowSpan={8} colSpan={2} bg="#2DC0D4">
                  <CanvasContainer />
                </GridItem>
                <GridItem rowSpan={1} colSpan={2} bg="orange">
                  drawing tools
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <Grid h="100%" templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)" gap={2}>
                    <GridItem rowSpan={1} colSpan={1} bg="#A5333C">
                      timer
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1} bg="#D4DCDC">
                      <ChatContainer />
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem rowSpan={{ base: 11 }} colSpan={{ base: 2 }} bg="gray.600">
              <UserListContainer position="right" />
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
