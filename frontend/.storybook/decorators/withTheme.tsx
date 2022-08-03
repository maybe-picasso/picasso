import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../src/theme';

export const withTheme = () => {
  return (storybookComponent: () => ReactNode) => {
    return <ChakraProvider theme={theme}>{storybookComponent()}</ChakraProvider>;
  };
};
