import { DrawingStatus, SocketMessageType } from './enums';

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
        drawingStatus: DrawingStatus;
        drawingMode?: string;
        lineWidth?: number;
        canvasSize?: CanvasSizeType;
        color?: string;
        point: {
          x: number;
          y: number;
        };
      };
    }

    interface CanvasSizeType {
      width: number;
      height: number;
      scrollWidth: number;
      scrollHeight: number;
      scaleX: number;
      scaleY: number;
    }

    interface UserInfo {
      clientId?: string;
      userId: string;
      nickName: string;
      profileIndex: number;
      point: number;
      isLogined: boolean;
    }

    interface CorrectUserInfo {
      userId: string;
      point: number;
      time: number;
    }

    interface UserInfoResponse {
      userId: string;
      email: string;
      name: string;
      profileUrl: string;
      locale: string;
      registerType: string;
      avatar: number[];
      point: number;
      lastLoginDate: number;
    }

    interface UserInfoRequest extends Partial<UserInfoResponse> {}
  }
}
