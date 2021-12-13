import { useEffect } from 'react';
import socket from 'modules/socket';

interface Props {
  roomId: string;
}

const SocketContainer = ({ roomId }: Props) => {
  useEffect(() => {
    console.log('SocketContainer :>> ', socket);

    socket.on('connect', () => {
      console.log('connected', socket.connected);
      console.log('disconnected', socket.disconnected);
    });

    socket.emit('lobby', { roomId, userId: 'user1' });

    socket.on('lobby', (data: any) => {
      console.log('lobby :>> ', data);
    });
  }, [roomId]);

  return null;
};

export default SocketContainer;
