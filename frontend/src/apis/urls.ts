import { apiServer } from '@/helpers/env';

export const API_BASE = apiServer;

export const API_URL = {
  USERS: `/users`,
  USER_INFO: `/users/profile`,
};

export default API_URL;
