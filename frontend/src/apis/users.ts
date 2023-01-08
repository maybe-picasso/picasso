import { request } from './config';
import API_URL from './urls';

export const getUserInfo = () => {
  return request.get(API_URL.USER_INFO);
};

export interface UpdateUserInfoParams {
  userId: string;
  data: Picasso.UserInfoRequest;
}

export const updateUserInfo = ({ userId, data }: UpdateUserInfoParams) => {
  return request.patch<Picasso.UserInfoResponse>(`${API_URL.USERS}/${userId}`, data);
};

export const addUserPoint = ({ userId, data }: UpdateUserInfoParams) => {
  return request.patch<Picasso.UserInfoResponse>(`${API_URL.USERS}/${userId}/point`, data);
};
