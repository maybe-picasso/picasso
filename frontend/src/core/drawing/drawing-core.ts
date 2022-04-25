import { DrawingTools } from 'types/enums';

const DEFAULT_MODE = DrawingTools.PEN;
const DEFAULT_COLOR = 'black';
const DEFAULT_SIZE = 3;
const LINE_CAP = 'round';

type Cursor = {
  x: number;
  y: number;
};

type Config = Record<string, any>;

export interface DrawingConstructorParams {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  config?: Config;
}

export interface DrawParams {
  context: CanvasRenderingContext2D;
  config?: Config;
  startPoint: Cursor;
  currentPoint: Cursor;
}

export class DrawingCore {
  public context: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public config: Config | undefined;
  public startPoint: Cursor = { x: 0, y: 0 };
  public currentPoint: Cursor = { x: 0, y: 0 };
  public getPoint(e: MouseEvent) {
    return {
      x: e.offsetX,
      y: e.offsetY,
    };
  }

  constructor({ canvas, context, config }: DrawingConstructorParams) {
    this.canvas = canvas;
    this.context = context;
    this.config = config;
  }

  start() {
    if (!this.context) {
      console.error('컨텍스트를 찾을 수 없습니다.');
      return;
    }

    this.context.beginPath();
  }

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

  end() {
    if (!this.context) {
      console.error('컨텍스트를 찾을 수 없습니다.');
      return;
    }

    this.context.closePath();
  }

  clearAll() {
    const { width, height } = this.context.canvas;
    this.context.clearRect(0, 0, width, height);
  }

  setConfig(config: Config) {
    const newConf = {
      ...this.config,
      ...config,
    };

    this.config = newConf;
  }
}
