import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway(3001, {
  transports: ['websocket'],
  namespace: 'picasso',
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private rooms: Record<string, any[]>;
  constructor() {
    this.rooms = {};
  }

  /**
   * SocketId로 방을 탐색 합니다.
   */
  private findRoomBySocketId(value: string) {
    const arr = Object.keys(this.rooms);
    let result = null;

    for (let i = 0; i < arr.length; i++) {
      if (this.rooms[arr[i]][value]) {
        result = arr[i];
        break;
      }
    }

    return result;
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init', server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`, args);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);

    const roomId = this.findRoomBySocketId(client.id);

    if (roomId) {
      const userInfo = this.rooms[roomId][client.id];
      delete this.rooms[roomId][client.id]; // 해당 유저 제거

      // 해당룸에 유저 정보 전달
      this.server.to(roomId).emit('leave', {
        userInfo,
        participants: this.rooms[roomId],
      });
    }
  }

  @SubscribeMessage('lobby')
  handleLobby(client: Socket, data: any) {
    this.logger.log('handleLobby', data);
    client.join(data.roomId);

    this.server.in(data.roomId).emit('lobby', data);

    // this.server.in(roomId).emit('lobby', roomId, {
    //   participants: this.rooms[roomId] ?? null
    // });
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.logger.log('handleEvent', data);
    return data;
  }
}
