import { request } from './config';
import API_URL from './urls';

export const getUserInfo = () => {
  return request.get(API_URL.USER_INFO);
};

export const updateUserInfo = (userId: string, data: Record<string, any>) => {
  return request.patch(`${API_URL.USERS}/${userId}`, data);
};
