import { useCallback } from 'react';
import { Flex, Spacer, Heading, IconButton } from '@chakra-ui/react';
import { IoExitOutline } from 'react-icons/io5';
import './index.scss';

const HeaderContainer = () => {
  const handleExit = useCallback(() => {
    window.location.pathname = '';
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
