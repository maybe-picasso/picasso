import { request } from './config';
import URLS from './urls';

export const getUserInfo = () => {
  return request.get(URLS.USER_INFO);
};

export const updateUserInfo = (userId: string, data: Record<string, any>) => {
  return request.patch(`${URLS.USERS}/${userId}`, data);
};
