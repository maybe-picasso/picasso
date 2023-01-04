import { useState } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Container, Divider, Heading, Stack } from '@chakra-ui/react';

import { ROOM_LIST } from '@/constants/index';
import PATHS from '@/routes/paths';

import './index.scss';

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleEnter = () => {
    navigate(`/room/${ROOM_LIST[selectedIndex].name}`);
  };

  return (
    <div className="home-wrap">
      <Container className="room-list-wrap">
        <Heading as="h1" size="2xl" mb="5" color="#fff">
          Picasso 🎨
          <Badge className="badge" variant="solid" colorScheme="purple">
            Alpha
          </Badge>
        </Heading>
        <ul>
          {ROOM_LIST.map(({ name }, index) => {
            const selected = selectedIndex === index;
            const className = `${selected ? 'active' : ''}`;
            return (
              <li key={name}>
                <button type="button" className={className} onClick={() => handleItemClick(index)}>
                  <span className="name">{name}</span>
                  {selected && <span className="icon">🔮</span>}
                </button>
              </li>
            );
          })}
        </ul>

        <Stack spacing={5}>
          <Divider />
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            variant="solid"
            rightIcon={<BsArrowRightCircleFill />}
            onClick={handleEnter}
          >
            시작하기
          </Button>
        </Stack>
      </Container>

      <footer>
        <Link to={PATHS.ABOUT}>About us</Link>
      </footer>
    </div>
  );
};

export default Home;
