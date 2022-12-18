import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { setStorage, LOCAL_STORAGE } from 'helpers/storage';
import PATHS from 'routes/paths';

import './index.scss';

const Auth = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('로그인 실패했습니다. 잠시 후 다시 시도해주세요.');
      navigate(PATHS.HOME);
      return;
    }

    setStorage(LOCAL_STORAGE.TOKEN, token);
    navigate(PATHS.HOME);
  }, [token, navigate]);

  return (
    <div className="auth-wrap">
      <Spinner thickness="4px" emptyColor="gray.200" color="gray.600" size="xl" />
    </div>
  );
};

export default Auth;
