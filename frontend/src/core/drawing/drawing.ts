import { DrawingCore, DrawParams } from './drawing-core';
import { DrawingTools } from 'types/enums';

const DEFAULT_MODE = DrawingTools.PEN;
const DEFAULT_COLOR = 'black';
const DEFAULT_SIZE = 3;
const LINE_CAP = 'round';

export class Drawing extends DrawingCore {
  draw({ context, config, startPoint, currentPoint }: DrawParams) {
    const size = config?.['size'] || DEFAULT_SIZE;
    const color = config?.['color'] || DEFAULT_COLOR;
    const mode = config?.['mode'] || DEFAULT_MODE;

    if (mode === DrawingTools.PEN) {
      context.globalCompositeOperation = 'source-over'; // 기본 설정으로 새로운 도형을 위에 그린다.
      context.strokeStyle = color;
      context.lineWidth = size;
    } else if (mode === DrawingTools.ERASER) {
      context.globalCompositeOperation = 'destination-out'; // 새롭게 그려지는 도형이 이전 그림과 겹치는 부분을 투명하게 바꾼다.
      context.lineWidth = size * 4;
    }

    context.lineJoin = LINE_CAP;
    context.lineCap = LINE_CAP;
    context.moveTo(startPoint.x, startPoint.y); // 시작점
    context.lineTo(currentPoint.x, currentPoint.y); // 현재점
    context.stroke();
  }

  bindSocketEventHandler() {
    // TODO: 소켓 메시지 처리 예정.
  }
}
