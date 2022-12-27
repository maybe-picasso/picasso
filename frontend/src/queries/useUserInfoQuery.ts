import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUserInfo } from 'apis/users';

export const useUserInfoQuery = (options?: UseQueryOptions<any, AxiosError>) => {
  return useQuery<any, AxiosError>(['useUserInfo'], async () => (await getUserInfo()).data, {
    ...options,
  });
};
