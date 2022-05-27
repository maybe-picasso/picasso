import { SocketMessageType, DrawingStatus } from './enums';

declare global {
  namespace Picasso {
    interface UserInfo {
      clientId?: string;
      userId: string;
      nickName: string;
      profileIndex: number;
    }

    interface SocketMessage {
      roomId: string;
      senderId: string;
      type: SocketMessageType;
      to?: 'all' | string;
      body: any;
    }

    interface DrawingMessage extends SocketMessage {
      body: {
        drawingStatus: DrawingStatus;
        drawingMode?: string;
        lineWidth?: number;
        canvasSize?: number;
        color?: string;
        point: {
          x: number;
          y: number;
        };
      };
    }
  }
}
