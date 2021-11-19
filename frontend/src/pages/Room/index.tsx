import { Heading } from '@chakra-ui/react';
import PageTemplate from 'components/PageTemplate';

import './index.scss';

const Room = () => {
  return (
    <PageTemplate id="room">
      <Heading mt={10} mb={10} textAlign="center" fontSize={40} color="#000">
        ROOM
      </Heading>
    </PageTemplate>
  );
};

export default Room;
