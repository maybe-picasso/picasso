import { Center,Spinner } from '@chakra-ui/react';

import './index.scss';

const PageFallback = () => {
  return (
    <Center className="page-fallback">
      <Spinner thickness="4px" emptyColor="gray.200" color="gray.600" size="xl" />
    </Center>
  );
};

export default PageFallback;
