import { DrawingCore, DrawingConstructorParams } from './drawing-core';
import { sendMessage, SocketMessageType } from 'core/socket';
import event from 'core/event';

type MouseEventHandler = (e: MouseEvent) => void;
export class Drawing extends DrawingCore {
  private enabled = false;
  private isDragging = false;
  private mouseDownHandler: MouseEventHandler | null = null;
  private mouseMoveHandler: MouseEventHandler | null = null;
  private mouseUpHandler: MouseEventHandler | null = null;

  constructor(params: DrawingConstructorParams) {
    super(params);
    this.init();
  }

  init() {
    this.mouseDownHandler = this.onMouseDown.bind(this);
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
    this.bindSocketEventHandler();
  }

  onMouseDown(e: MouseEvent) {
    console.log('onMouseDown :>> ', e);
    this.isDragging = true;
    this.startPoint = this.getPoint(e);
    this.start();

    const { size, color, mode } = this.getConfig();

    sendMessage({
      type: SocketMessageType.Drawing,
      body: {
        drawingStatus: 'start',
        drawingMode: mode,
        lineWidth: size,
        color,
        canvasSize: this.getCanvasSize(),
        point: this.startPoint,
      },
    });
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

    sendMessage({
      type: SocketMessageType.Drawing,
      body: {
        drawingStatus: 'draw',
        point: this.currentPoint,
      },
    });
  }

  onMouseUp(e: MouseEvent) {
    console.log('onMouseUp :>> ', e);
    this.isDragging = false;
    this.end();

    sendMessage({
      type: SocketMessageType.Drawing,
      body: {
        drawingStatus: 'end',
      },
    });
  }

  enable() {
    if (this.enabled) {
      return;
    }

    this.enabled = true;
    this.bindMouseEventHandler();
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    this.enabled = false;
    this.unbindMouseEventHandler();
  }

  dispose() {
    this.unbindMouseEventHandler();
    this.mouseDownHandler = null;
    this.mouseMoveHandler = null;
    this.mouseUpHandler = null;
  }

  bindMouseEventHandler() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.addEventListener('mousedown', this.mouseDownHandler);
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);
  }

  unbindMouseEventHandler() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
    this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
  }

  bindSocketEventHandler() {
    // TODO: 소켓 메시지로 그리기 처리 예정
    event.on(SocketMessageType.Drawing, (data) => {
      console.log('drawing 소켓 메시지 :>> ', data);
      const { body } = data;

      switch (body.drawingStatus) {
        case 'start':
          this.startPoint = body.point;
          this.start();
          break;
        case 'draw':
          this.currentPoint = body.point;
          this.draw({
            context: this.context,
            config: this.config,
            startPoint: this.startPoint,
            currentPoint: this.currentPoint,
          });
          this.startPoint = this.currentPoint;
          break;
        case 'end':
          this.end();
          break;
      }
    });
  }
}
