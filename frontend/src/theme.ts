import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const theme = extendTheme({
  breakpoints,
});
