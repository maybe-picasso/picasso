import { useSelector } from 'react-redux';

import { select } from '@/store';

const useMyTurn = () => {
  const { userInfo } = useSelector(select.room.state);
  const { painterId } = useSelector(select.game.state);

  return userInfo?.userId === painterId;
};

export default useMyTurn;
