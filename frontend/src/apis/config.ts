import axios from 'axios';
import { API_BASE } from './urls';
import { getStorage, LOCAL_STORAGE } from 'helpers/storage';

const AUTH_TOKEN = getStorage(LOCAL_STORAGE.TOKEN);

export const request = axios.create({
  baseURL: API_BASE,
  timeout: 10_000,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});
