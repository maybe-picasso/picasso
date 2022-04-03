type Cursor = {
  x: number;
  y: number;
};

export type Config = Record<string, any>;

type ToolConstructorParams = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  config?: Config;
};

export type DoItParams = {
  context: CanvasRenderingContext2D;
  config?: Config;
  startPoint: Cursor;
  currentPoint: Cursor;
};

type MouseEventHandler = (e: MouseEvent) => void;

export class Tool {
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private config: Config | undefined;
  private isDragging = false;
  private startPoint: Cursor = {
    x: 0,
    y: 0,
  };
  private currentPoint: Cursor = {
    x: 0,
    y: 0,
  };
  private enabled = false;
  private mouseDownHandler: MouseEventHandler | null = null;
  private mouseMoveHandler: MouseEventHandler | null = null;
  private mouseUpHandler: MouseEventHandler | null = null;

  constructor({ canvas, context, config }: ToolConstructorParams) {
    this.canvas = canvas;
    this.context = context;
    this.config = config;
    this.init();
  }

  init() {
    this.mouseDownHandler = this.onMousedown.bind(this);
    this.mouseMoveHandler = this.onMousemove.bind(this);
    this.mouseUpHandler = this.onMouseup.bind(this);
  }

  beforeDo() {
    if (!this.context) {
      console.error('컨텍스트를 찾을 수 없습니다.');
      return;
    }

    this.context.beginPath();
  }

  do() {
    this.beforeDo();
    this.doIt({
      context: this.context,
      config: this.config,
      startPoint: this.startPoint,
      currentPoint: this.currentPoint,
    });
  }

  afterDo() {
    if (!this.context) {
      console.error('컨텍스트를 찾을 수 없습니다.');
      return;
    }

    this.context.closePath();
  }

  doIt({ context, config, startPoint, currentPoint }: DoItParams) {
    console.warn('It must be implemented!');
  }

  enable() {
    if (this.enabled) {
      return;
    }

    this.enabled = true;
    this.registerEventHander();
  }

  setConfig(config: Config) {
    const newConf = {
      ...this.config,
      ...config,
    };

    this.config = newConf;
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    this.enabled = false;
    this.unregisterEventHandler();
  }

  registerEventHander() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.addEventListener('mousedown', this.mouseDownHandler);
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);
  }

  unregisterEventHandler() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
    this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
  }

  onMousedown(e: MouseEvent) {
    console.log(e);
    const { offsetX: x, offsetY: y } = e;
    this.isDragging = true;
    this.startPoint = {
      x,
      y,
    };
  }

  onMousemove(e: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    const { offsetX: x, offsetY: y } = e;

    this.currentPoint = {
      x,
      y,
    };

    this.do();
    this.startPoint = this.currentPoint;
  }

  onMouseup(e: MouseEvent) {
    this.isDragging = false;
  }

  dispose() {
    this.unregisterEventHandler();
    this.mouseDownHandler = null;
    this.mouseMoveHandler = null;
    this.mouseUpHandler = null;
  }
}
