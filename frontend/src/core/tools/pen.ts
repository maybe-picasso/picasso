import { Tool, DoItParams } from './tool';

const PEN_SIZE_FACTOR = 1;
const DEFAULT_FILL_COLOR = 'black';

export class Pen extends Tool {
  doIt({ context, cursor, config }: DoItParams) {
    const size = config?.['size'];
    const fillStyle = config?.['color'] || DEFAULT_FILL_COLOR;

    const penSize = size * PEN_SIZE_FACTOR;
    const { x, y } = cursor;

    const centerX = x - penSize / 2;
    const centerY = y - penSize / 2;

    context.fillStyle = fillStyle;
    context.ellipse(centerX, centerY, penSize, penSize, 0, 0, 2 * Math.PI);
    context.fill();
  }
}
