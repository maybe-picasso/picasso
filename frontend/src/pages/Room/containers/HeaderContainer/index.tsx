import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Spacer, Heading, IconButton } from '@chakra-ui/react';
import { IoExitOutline } from 'react-icons/io5';
import PATHS from 'routes/paths';
import socket from 'core/socket';

import './index.scss';

const HeaderContainer = () => {
  const navigate = useNavigate();
  const handleExit = useCallback(() => {
    navigate(PATHS.HOME, { replace: true });
    socket.emit('leave');
    // eslint-disable-next-line
  }, []);

  return (
    <Flex className="header-container" h="100%" p="4" align="center">
      <Heading fontSize={20} color="#fff">
        Picasso
      </Heading>
      <Spacer />
      <IconButton aria-label="Exit" fontSize={20} icon={<IoExitOutline />} onClick={handleExit} />
    </Flex>
  );
};

export default HeaderContainer;
