import { Container, Heading, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { select } from 'store';

import PageTemplate from 'components/PageTemplate';
import { SocketContainer, GateContainer, ChatContainer, UserListContainer } from './containers';

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
        <Container p={0} maxW="100%">
          <Grid h="100vh" templateRows="repeat(8, 1fr)" templateColumns="repeat(8, 1fr)" gap={2}>
            <GridItem rowSpan={1} colSpan={8} bg="tomato">
              <Heading mt={1} mb={1} textAlign="center" fontSize={20} color="#000">
                room/{roomId}
              </Heading>
            </GridItem>

            <GridItem rowSpan={{ base: 1, xl: 7 }} colSpan={{ base: 8, xl: 2 }} bg="gray.600">
              <UserListContainer />
            </GridItem>

            <GridItem rowSpan={{ base: 4, md: 7 }} colSpan={{ base: 8, md: 5, xl: 4 }} bg="white">
              <Text fontSize="6xl" color="#000">
                drawing~
              </Text>
            </GridItem>

            <GridItem rowSpan={{ base: 2, md: 7 }} colSpan={{ base: 8, md: 3, xl: 2 }} bg="teal">
              <ChatContainer />
            </GridItem>
          </Grid>
        </Container>
      ) : (
        <Flex h="100%" color="white">
          <GateContainer roomId={roomId} />
        </Flex>
      )}
    </PageTemplate>
  );
};

export default Room;
