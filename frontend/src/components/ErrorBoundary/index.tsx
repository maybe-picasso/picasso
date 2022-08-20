import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div role="alert">
      <p>Oh No Error:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const errorHandler = (error: Error, info: { componentStack: string }) => {
  console.info('error :>> ', error, info);
};

export default ErrorBoundary;
