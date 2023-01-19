import { Link } from 'react-router-dom';
import { Badge, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { LoginProfileContainer, MyInfoContainer, RoomListContainer } from '@/pages/Home/containers';
import PATHS from '@/routes/paths';

import './index.scss';

const Home = () => {
  return (
    <div className="home-wrap">
      <Container alignContent="center" className="room-list-wrap">
        <Heading as="h1" size="2xl" color="#fff">
          Picasso 🎨
          <Badge className="badge" variant="solid" colorScheme="purple">
            Alpha
          </Badge>
        </Heading>

        <LoginProfileContainer />

        <Tabs isFitted variant="soft-rounded" colorScheme="linkedin">
          <TabList>
            <Tab>룸목록</Tab>
            <Tab>내정보</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RoomListContainer />
            </TabPanel>
            <TabPanel>
              <MyInfoContainer />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      <footer>
        <Link to={PATHS.ABOUT}>About us</Link>
      </footer>
    </div>
  );
};

export default Home;
