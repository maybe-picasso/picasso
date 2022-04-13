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

interface DrawingConstructorParams {
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

type MouseEventHandler = (e: MouseEvent) => void;

export class DrawingCore {
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private config: Config | undefined;
  private isDragging = false;
  private enabled = false;
  private mouseDownHandler: MouseEventHandler | null = null;
  private mouseMoveHandler: MouseEventHandler | null = null;
  private mouseUpHandler: MouseEventHandler | null = null;
  private startPoint: Cursor = { x: 0, y: 0 };
  private currentPoint: Cursor = { x: 0, y: 0 };
  private getPoint(e?: MouseEvent) {
    return {
      x: e?.offsetX ?? 0,
      y: e?.offsetY ?? 0,
    };
  }

  constructor({ canvas, context, config }: DrawingConstructorParams) {
    this.canvas = canvas;
    this.context = context;
    this.config = config;
    this.init();
  }

  init() {
    this.mouseDownHandler = this.onMouseDown.bind(this);
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
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

  enable() {
    if (this.enabled) {
      return;
    }

    this.enabled = true;
    this.registEventHander();
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    this.enabled = false;
    this.unregistEventHandler();
  }

  registEventHander() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.addEventListener('mousedown', this.mouseDownHandler);
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);
  }

  unregistEventHandler() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
    this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
  }

  onMouseDown(e: MouseEvent) {
    console.log('onMouseDown :>> ', e);
    this.isDragging = true;
    this.startPoint = this.getPoint(e);
    this.start();
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    this.currentPoint = this.getPoint(e);
    this.draw({
      context: this.context,
      config: this.config,
      startPoint: this.startPoint,
      currentPoint: this.currentPoint,
    });
    this.startPoint = this.currentPoint;
  }

  onMouseUp(e: MouseEvent) {
    console.log('onMouseUp :>> ', e);
    this.isDragging = false;
    this.end();
  }

  dispose() {
    this.unregistEventHandler();
    this.mouseDownHandler = null;
    this.mouseMoveHandler = null;
    this.mouseUpHandler = null;
  }
}
