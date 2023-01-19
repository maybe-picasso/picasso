import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getUserInfo, updateUserInfo, UpdateUserInfoParams } from '@/apis/users';

export const useUserInfoQuery = (options?: UseQueryOptions<null, AxiosError, Picasso.UserInfoResponse>) => {
  return useQuery<null, AxiosError, Picasso.UserInfoResponse>(['getUserInfo'], async () => (await getUserInfo()).data, {
    ...options,
  });
};

export const useUserInfoMutation = (
  options?: UseMutationOptions<Picasso.UserInfoResponse, AxiosError, UpdateUserInfoParams>
) => {
  return useMutation<Picasso.UserInfoResponse, AxiosError, UpdateUserInfoParams>(
    async (data: UpdateUserInfoParams) => (await updateUserInfo(data)).data,
    {
      ...options,
    }
  );
};
