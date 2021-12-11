import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Container, Heading, Grid, GridItem, Text } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import PageTemplate from 'components/PageTemplate';

import './index.scss';

const Room = () => {
  useEffect(() => {
    const socket = io('ws://localhost:3001/picasso', {
      transports: ['websocket'],
      jsonp: false,
    });

    socket.on('connect', () => {
      console.log('socket connect :>> ');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect :>> ');
      socket.connect();
    });
  });
  createBreakpoints({
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  });

  return (
    <PageTemplate id="room">
      <Container p={0} maxW="100%">
        <Grid h="100vh" templateRows="repeat(8, 1fr)" templateColumns="repeat(8, 1fr)" gap={2}>
          <GridItem rowSpan={1} colSpan={8} bg="tomato">
            <Heading mt={10} mb={10} textAlign="center" fontSize={40} color="#000">
              ROOM
            </Heading>
          </GridItem>

          <GridItem rowSpan={{ base: 1, xl: 7 }} colSpan={{ base: 8, xl: 2 }} bg="gray.600">
            참가자 목록
          </GridItem>

          <GridItem rowSpan={{ base: 4, md: 7 }} colSpan={{ base: 8, md: 5, xl: 4 }} bg="white">
            <Text fontSize="6xl" color="#000">
              drawing~
            </Text>
          </GridItem>

          <GridItem rowSpan={{ base: 2, md: 7 }} colSpan={{ base: 8, md: 3, xl: 2 }} bg="teal">
            채팅
          </GridItem>
        </Grid>
      </Container>
    </PageTemplate>
  );
};

export default Room;
