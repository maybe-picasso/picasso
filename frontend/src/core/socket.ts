import io from 'socket.io-client';
import { isNodeProdcution } from 'helpers/env';

const SOCKET_SERVER = isNodeProdcution ? 'ws://localhost:3000/picasso' : 'ws://localhost:3000/picasso';

let roomId: string;
let senderId: string;

export const socket = io(SOCKET_SERVER, {
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
