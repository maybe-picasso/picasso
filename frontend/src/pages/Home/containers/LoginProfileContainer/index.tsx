import { BsGoogle } from 'react-icons/bs';
import { Avatar } from '@chakra-ui/react';

import { useAuth } from '@/hooks';
import { useUserInfoQuery } from '@/queries';

import './index.scss';

const LoginProfileContainer = () => {
  const { data: userInfo } = useUserInfoQuery();
  const { name, profileUrl } = userInfo ?? {};
  const { handleLogin } = useAuth();

  return (
    <div className="login-profile">
      {userInfo ? (
        <button type="button" onClick={() => null} title={name}>
          <p>{name}</p>
          <span className="circle">
            <Avatar src={profileUrl} />
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
