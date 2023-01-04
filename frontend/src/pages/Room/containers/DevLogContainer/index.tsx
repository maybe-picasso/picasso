import { useSelector } from 'react-redux';

import { select } from '@/store';
import { GameStatus } from '@/types/enums';
import { usePainterInfo } from '../../hooks';

import './index.scss';

const DevLogContainer = () => {
  const { isConnectedSocket } = useSelector(select.room.state);
  const { status } = useSelector(select.game.state);
  const currentQuestion = useSelector(select.game.currentQuestion);
  const painterInfo = usePainterInfo();

  return (
    <div className="dev-log">
      <h3>Game Dev Status</h3>
      <ul>
        <li>
          <strong>Socket</strong>
          <span>{isConnectedSocket ? 'Connected' : 'Disconnected'}</span>
        </li>
        <li>
          <strong>Status</strong>
          <span>{status}</span>
        </li>
        <li>
          <strong>Painter</strong>
          <span>{painterInfo?.nickName ?? 'NONE'}</span>
        </li>
        <li>
          <strong>Question</strong>
          <span>{status === GameStatus.WAITING_PLAYER ? '대기중' : currentQuestion}</span>
        </li>
      </ul>
    </div>
  );
};

export default DevLogContainer;
