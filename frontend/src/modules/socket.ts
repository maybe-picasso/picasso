import io from 'socket.io-client';
import { isNodeProdcution } from 'modules/env';

const SOCKET_SERVER = isNodeProdcution ? 'ws://localhost:3001/picasso' : 'ws://localhost:3001/picasso';

export const socket = io(SOCKET_SERVER, {
  transports: ['websocket'],
});

export default socket;
