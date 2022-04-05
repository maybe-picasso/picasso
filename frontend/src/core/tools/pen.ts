import { Drawing, DrawParams } from './drawing';

const DEFAULT_COLOR = 'black';
const LINE_CAP = 'round';

export class Pen extends Drawing {
  draw({ context, config, startPoint, currentPoint }: DrawParams) {
    const size = config?.['size'];
    const color = config?.['color'] || DEFAULT_COLOR;

    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineJoin = LINE_CAP;
    context.lineCap = LINE_CAP;
    context.moveTo(startPoint.x, startPoint.y); // 시작점
    context.lineTo(currentPoint.x, currentPoint.y); // 현재점
    context.stroke();
  }
}
