import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { LOCAL_STORAGE, setStorage } from '@/helpers/storage';
import PATHS from '@/routes/paths';

import './index.scss';

const Auth = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('로그인 후 이용해주세요.');
      navigate(PATHS.HOME);
      return;
    }

    setStorage(LOCAL_STORAGE.TOKEN, token);
    window.location.href = PATHS.HOME;
  }, [token, navigate]);

  return (
    <div className="auth-wrap">
      <Spinner thickness="4px" emptyColor="gray.200" color="gray.600" size="xl" />
    </div>
  );
};

export default Auth;
