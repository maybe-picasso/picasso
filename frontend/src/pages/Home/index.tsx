import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Heading, Stack, Divider, Badge, Avatar, Spinner } from '@chakra-ui/react';
import { BsArrowRightCircleFill, BsGoogle } from 'react-icons/bs';
import { ROOM_LIST } from 'constants/index';
import PATHS from 'routes/paths';

import { useUserInfoQuery } from 'queries';
import './index.scss';

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoading, data: userInfo } = useUserInfoQuery();

  const navigate = useNavigate();

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleEnter = () => {
    navigate(`/room/${ROOM_LIST[selectedIndex].name}`);
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
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
            isLoading={isLoading}
            rightIcon={<BsArrowRightCircleFill />}
            onClick={handleEnter}
          >
            시작하기
          </Button>
        </Stack>
      </Container>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {userInfo ? (
            <Avatar src={userInfo.profileUrl} />
          ) : (
            <Button
              type="button"
              colorScheme="red"
              size="lg"
              variant="solid"
              rightIcon={<BsGoogle />}
              onClick={handleLogin}
            >
              Google 로그인
            </Button>
          )}
        </>
      )}

      <footer>
        <Link to={PATHS.ABOUT}>About us</Link>
      </footer>
    </div>
  );
};

export default Home;
