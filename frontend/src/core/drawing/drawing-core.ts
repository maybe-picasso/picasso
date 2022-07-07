import { DrawingTools } from 'types/enums';

const DEFAULT_MODE = DrawingTools.PEN;
const DEFAULT_COLOR = 'black';
const DEFAULT_SIZE = 3;
const DEFAULT_LINE_OPACITY = 1;
const LINE_CAP = 'round';

type Cursor = {
  x: number;
  y: number;
};

interface Config {
  mode: string;
  color: string;
  size: number;
  opacity: number;
}

export interface DrawingConstructorParams {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  config?: Config;
}

export interface DrawParams {
  context: CanvasRenderingContext2D;
  config: Config;
  startPoint: Cursor;
  currentPoint: Cursor;
}

export class DrawingCore {
  public context: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public config: Config;
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
    this.config = config ?? {
      size: DEFAULT_SIZE,
      color: DEFAULT_COLOR,
      opacity: DEFAULT_LINE_OPACITY,
      mode: DEFAULT_MODE,
    };
  }

  start() {
    if (!this.context) {
      console.error('컨텍스트를 찾을 수 없습니다.');
      return;
    }

    this.context.beginPath();
  }

  draw({ context, config, startPoint, currentPoint }: DrawParams) {
    const { mode, size, color, opacity } = config;

    if (mode === DrawingTools.PEN) {
      context.globalCompositeOperation = 'source-over'; // 기본 설정으로 새로운 도형을 위에 그린다.
      context.strokeStyle = color;
      context.fillStyle = color;
      context.globalAlpha = opacity;
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

  clear() {
    const { width, height } = this.context.canvas;
    this.context.clearRect(0, 0, width, height);
  }

  setConfig(config: Partial<Config>) {
    const newConf = {
      ...this.config,
      ...config,
    };

    this.config = newConf;
  }

  getConfig() {
    return this.config;
  }

  getCanvasSize(): Picasso.CanvasSizeType {
    const { width, height, scrollWidth, scrollHeight } = this.canvas;

    return {
      width,
      height,
      scrollWidth,
      scrollHeight,
      scaleX: width / scrollWidth,
      scaleY: height / scrollHeight,
    };
  }
}
