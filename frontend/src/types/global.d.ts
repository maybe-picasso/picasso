import { SocketMessageType, DrawingStatusType } from './enums';

declare global {
  namespace Picasso {
    interface SocketMessage {
      roomId: string;
      senderId: string;
      type: SocketMessageType;
      to?: 'all' | string;
      body: any;
    }

    interface DrawingMessage extends SocketMessage {
      body: {
        drawingStatus: DrawingStatusType;
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
