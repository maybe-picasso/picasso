import { useSelector } from 'react-redux';
import { select } from 'store';

const usePainterInfo = () => {
  const { participants } = useSelector(select.room.state);
  const { painterId } = useSelector(select.game.state);

  return participants.find(({ userId }) => userId === painterId);
};

export default usePainterInfo;
