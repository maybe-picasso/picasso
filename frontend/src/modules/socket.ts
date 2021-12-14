import io from 'socket.io-client';
import { isNodeProdcution } from 'modules/env';

const SOCKET_SERVER = isNodeProdcution ? 'ws://localhost:3001/picasso' : 'ws://localhost:3001/picasso';

let roomId: string | null = null;
let senderId: string | null = null;

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

type SocketMessageTarget = 'all' | string;

export const sendMessage = ({ type, body, to = 'all' }: { type: string; body: any; to?: SocketMessageTarget }) => {
  const data = {
    roomId,
    senderId,
    to,
    type,
    body,
  };

  socket.send(data);
};

export default socket;
