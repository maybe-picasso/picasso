import { useSelector } from 'react-redux';
import { head } from 'lodash-es';

import { select } from '@/store';

const useFirstUser = () => {
  const { participants, userInfo } = useSelector(select.room.state);
  const isFirstUser = head(participants)?.userId === userInfo?.userId;

  return {
    isFirstUser,
  };
};

export default useFirstUser;
