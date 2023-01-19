import io from 'socket.io-client';

import { socketServer } from '@/helpers/env';

let roomId: string;
let senderId: string;

export const socket = io(socketServer, {
  transports: ['websocket'],
});

interface SocketInitData {
  roomId: string;
  userId: string;
}

export const setupBaseInfo = ({ roomId: id, userId }: SocketInitData) => {
  roomId = id;
  senderId = userId;
};

export const sendMessage = ({ type, body, to = 'all' }: Pick<Picasso.SocketMessage, 'type' | 'body' | 'to'>) => {
  const data: Picasso.SocketMessage = {
    roomId,
    senderId,
    to,
    type,
    body,
  };

  socket.send(data);
};

export default socket;
