import { ErrorBoundary } from 'react-error-boundary';
import { Box, Button, Code } from '@chakra-ui/react';

import './index.scss';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div className="error-fallback" role="alert">
      <h1>😱</h1>
      <p>Oh No error: {error.message}</p>
      <Box m="10px 0 30px">
        <Code p="10px">{error.stack}</Code>
      </Box>
      <Button colorScheme="blue" variant="outline" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

export const errorHandler = (error: Error, info: { componentStack: string }) => {
  console.info('error :>> ', error, info);
};

export default ErrorBoundary;
