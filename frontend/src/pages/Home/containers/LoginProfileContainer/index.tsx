import { BsGoogle } from 'react-icons/bs';

import { Avatar, Spinner } from '@chakra-ui/react';
import { LOCAL_STORAGE, deleteStorage } from 'helpers/storage';
import { useUserInfoQuery } from 'queries';
import './index.scss';

const LoginProfileContainer = () => {
  const { isLoading, data: userInfo } = useUserInfoQuery();

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLogout = () => {
    deleteStorage(LOCAL_STORAGE.TOKEN);
    window.location.href = '/';
  };

  return (
    <div className="login-profile">
      {isLoading ? (
        <Spinner />
      ) : userInfo ? (
        <button type="button" onClick={handleLogout} title={userInfo.displayName}>
          <p>{userInfo.displayName}</p>
          <span className="circle">
            <Avatar src={userInfo.profileUrl} />
          </span>
        </button>
      ) : (
        <button type="button" onClick={handleLogin}>
          <p>로그인</p>
          <span className="circle">
            <BsGoogle />
          </span>
        </button>
      )}
    </div>
  );
};

export default LoginProfileContainer;
