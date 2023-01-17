import { deleteStorage, LOCAL_STORAGE } from '@/helpers/storage';

export const useAuth = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLogout = () => {
    deleteStorage(LOCAL_STORAGE.TOKEN);
    window.location.href = '/';
  };

  return {
    handleLogin,
    handleLogout,
  };
};
