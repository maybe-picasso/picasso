import { useSelector } from 'react-redux';

import { select } from '@/store';

const useMyCorrect = () => {
  const { userInfo } = useSelector(select.room.state);
  const { correctUserList } = useSelector(select.gamePoint.state);

  return correctUserList.find((user) => user.userId === userInfo?.userId);
};

export default useMyCorrect;
