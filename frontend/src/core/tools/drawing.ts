type Cursor = {
  x: number;
  y: number;
};

type Config = Record<string, any>;

type DrawingConstructorParams = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  config?: Config;
};

export type DrawParams = {
  context: CanvasRenderingContext2D;
  config?: Config;
  startPoint: Cursor;
  currentPoint: Cursor;
};

type MouseEventHandler = (e: MouseEvent) => void;

export class Drawing {
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

  draw(params: DrawParams) {
    console.warn('It must be implemented!', params);
  }

  end() {
    if (!this.context) {
      console.error('컨텍스트를 찾을 수 없습니다.');
      return;
    }

    this.context.closePath();
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
    this.startPoint = {
      x: e.offsetX,
      y: e.offsetY,
    };
    this.start();
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    this.currentPoint = {
      x: e.offsetX,
      y: e.offsetY,
    };
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
