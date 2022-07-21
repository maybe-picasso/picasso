import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';

@WebSocketGateway({
  transports: ['websocket'],
  cors: true,
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() {
    this.rooms = {};
  }

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketGateway');
  private rooms: Record<string, any[]>;

  /**
   * socket clientId로 방을 탐색 합니다.
   */
  private findRoomIdByClientId(clientId: string) {
    const arr = Object.keys(this.rooms);
    let result = null;

    for (let i = 0; i < arr.length; i++) {
      const targetRoom = this.rooms[arr[i]];
      const userInfo = targetRoom.find((data) => data.clientId === clientId);

      if (userInfo) {
        result = arr[i];
        break;
      }
    }

    return result;
  }

  private joinUser(clientId: string, data: any) {
    const { roomId, userInfo } = data;

    const userData = {
      ...userInfo,
      clientId,
    };

    // 룸에 참여자 정보 추가
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }
    this.rooms[roomId].push(userData);

    // 해당룸에 전파
    this.server.to(roomId).emit('join', {
      userInfo: userData,
      participants: this.rooms[roomId],
    });
  }

  private leaveUser(clientId: string) {
    const roomId = this.findRoomIdByClientId(clientId);

    if (roomId) {
      const targetRoom = this.rooms[roomId];
      const userInfo = targetRoom.find((data) => data.clientId === clientId);

      // 해당 유저 목록 제거
      this.rooms[roomId] = targetRoom.filter((data) => data.clientId !== clientId);

      // 해당룸에 전파
      this.server.to(roomId).emit('leave', {
        userInfo,
        participants: this.rooms[roomId],
      });
    }
  }

  private message(client: Socket, data) {
    if (data.to === 'all') {
      client.broadcast.to(data.roomId).emit('message', data);
    } else {
      const targetRoom = this.rooms[data.roomId];
      const userInfo = targetRoom.find((info) => info.userId === data.to);
      client.to(userInfo.clientId).emit('message', data);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init', server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`, args);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
    this.leaveUser(client.id);
  }

  @SubscribeMessage('gate')
  handleGate(client: Socket, roomId: string) {
    this.logger.log('handleGate', roomId);
    client.join(roomId);

    this.server.to(roomId).emit('gate', {
      participants: this.rooms[roomId] ?? [],
    });
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, data) {
    this.logger.log('handleJoin', client.id);
    this.joinUser(client.id, data);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket) {
    this.logger.log('handleLeave', client.id);
    this.leaveUser(client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data) {
    this.logger.log('handleMessage', data);
    this.message(client, data);
  }
}
