import io from 'socket.io-client';
import { isNodeProdcution } from 'helpers/env';

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

export enum SocketMessageType {
  Chat = 'Chat',
  Draw = 'Draw',
}

export const setupBaseInfo = ({ roomId: id, userId }: SocketInitData) => {
  roomId = id;
  senderId = userId;
};

export const sendMessage = ({
  type,
  body,
  to = 'all',
}: {
  type: SocketMessageType;
  to?: 'all' | string;
  body: any;
}) => {
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
