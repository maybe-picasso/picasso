import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/users';

export const useUserInfoQuery = (options?: UseQueryOptions<any, AxiosError>) => {
  return useQuery<any, AxiosError>(['userInfo'], async () => (await getUserInfo()).data, {
    ...options,
  });
};
