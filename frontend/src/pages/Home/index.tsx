import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Heading, Stack, Divider } from '@chakra-ui/react';
import { BsArrowRightCircleFill, BsArrowRight } from 'react-icons/bs';

import './index.scss';

const ROOM_LIST = [
  { name: '룸1' },
  { name: '룸2' },
  { name: '룸3' },
  { name: '룸4' },
  { name: '룸5' },
  { name: '룸6' },
];

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleEnter = () => {
    navigate(`/room/${ROOM_LIST[selectedIndex].name}`);
  };

  return (
    <div className="home-wrap">
      <Container className="room-list-wrap">
        <Heading as="h1" size="xl" mb="5" color="#fff">
          Picasso
        </Heading>
        <ul>
          {ROOM_LIST.map(({ name }, index) => {
            const selected = selectedIndex === index;
            const className = `${selected ? 'active' : ''}`;
            return (
              <li>
                <button type="button" className={className} onClick={() => handleListClick(index)}>
                  <span>{name}</span>
                  <span>{selected && '🎨'}</span>
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
    </div>
  );
};

export default Home;
