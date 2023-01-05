import { BsGoogle } from 'react-icons/bs';
import { Avatar } from '@chakra-ui/react';

import { deleteStorage, LOCAL_STORAGE } from '@/helpers/storage';
import { useUserInfoQuery } from '@/queries';

import './index.scss';

const LoginProfileContainer = () => {
  const { data: userInfo } = useUserInfoQuery();
  console.log('확인 userInfo :>> ', userInfo);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLogout = () => {
    deleteStorage(LOCAL_STORAGE.TOKEN);
    window.location.href = '/';
  };

  return (
    <div className="login-profile">
      {userInfo ? (
        <button type="button" onClick={handleLogout} title={userInfo.displayName}>
          <p>{userInfo.name}</p>
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
