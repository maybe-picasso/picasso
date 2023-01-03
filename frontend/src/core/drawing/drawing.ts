import event from 'core/event';
import { sendMessage } from 'core/socket';
import { DrawingStatus, SocketMessageType } from 'types/enums';

import { DrawingConstructorParams, DrawingCore, DrawParams } from './drawing-core';

type MouseEventHandler = (e: MouseEvent) => void;
type KeyboardEventHandler = (e: KeyboardEvent) => void;

export class Drawing extends DrawingCore {
  private enabled = false;
  private isDragging = false;
  private drawCommandQueue: DrawParams[][] = [];
  private currentDrawCommand: DrawParams[] = [];
  private redoDrawingStack: DrawParams[][] = [];
  private canvasSize: Picasso.CanvasSizeType | null = null;
  private scaleX: number = 1;
  private scaleY: number = 1;
  private mouseDownHandler: MouseEventHandler | null = null;
  private mouseMoveHandler: MouseEventHandler | null = null;
  private mouseUpHandler: MouseEventHandler | null = null;
  private keyDownHandler: KeyboardEventHandler | null = null;

  constructor(params: DrawingConstructorParams) {
    super(params);
    this.init();
  }

  init() {
    this.mouseDownHandler = this.onMouseDown.bind(this);
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
    this.keyDownHandler = this.onKeyDown.bind(this);
    this.bindSocketEventHandler();
  }

  onMouseDown(e: MouseEvent) {
    console.log('onMouseDown :>> ', e);
    this.isDragging = true;
    this.canvasSize = this.getCanvasSize();
    this.startPoint = this.getPoint(e);
    this.start();
    this.currentDrawCommand = [];
    this.redoDrawingStack = [];

    const { size, color, mode } = this.getConfig();

    sendMessage({
      type: SocketMessageType.DRAWING,
      body: {
        drawingStatus: DrawingStatus.START,
        drawingMode: mode,
        lineWidth: size,
        color,
        canvasSize: this.canvasSize,
        point: this.startPoint,
      },
    });
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    this.currentPoint = this.getPoint(e);

    // 캔버스 사이즈 변화에 대한 좌표 처리
    const { scaleX, scaleY } = this.canvasSize!;
    const startPoinByScale = {
      x: this.startPoint.x * scaleX,
      y: this.startPoint.y * scaleY,
    };
    const currentPointByScale = {
      x: this.currentPoint.x * scaleX,
      y: this.currentPoint.y * scaleY,
    };
    const drawingCommand = {
      context: this.context,
      config: this.config,
      startPoint: startPoinByScale,
      currentPoint: currentPointByScale,
    };

    this.draw(drawingCommand);
    this.startPoint = this.currentPoint;
    this.currentDrawCommand.push(drawingCommand);

    sendMessage({
      type: SocketMessageType.DRAWING,
      body: {
        drawingStatus: DrawingStatus.DRAW,
        point: this.currentPoint,
      },
    });
  }

  undo() {
    const drawing = this.drawCommandQueue.pop();

    // []가 들어있는 경우가 있어서, 유효한 커맨드가 존재할때까지 반복
    if (drawing?.length === 0 && this.drawCommandQueue.length > 0) {
      this.undo();
    } else if (drawing) {
      this.redoDrawingStack.push(drawing);
    }

    this.restoreDraw();

    sendMessage({
      type: SocketMessageType.DRAWING,
      body: {
        drawingStatus: DrawingStatus.REDO,
      },
    });
  }

  redo() {
    const drawing = this.redoDrawingStack.pop();

    // []가 들어있는 경우가 있어서, 유효한 커맨드가 존재할때까지 반복
    if (drawing?.length === 0 && this.redoDrawingStack.length > 0) {
      this.redo();
    } else if (drawing) {
      this.drawCommandQueue.push(drawing);
    }

    this.restoreDraw();

    sendMessage({
      type: SocketMessageType.DRAWING,
      body: {
        drawingStatus: DrawingStatus.REDO,
      },
    });
  }

  restoreDraw() {
    this.clear();
    this.drawCommandQueue.forEach((drawing) => {
      this.context.beginPath();
      drawing.forEach((drawingParams) => {
        this.draw(drawingParams);
      });
      this.context.closePath();
    });
  }

  onMouseUp(e: MouseEvent) {
    console.log('onMouseUp :>> ', e);
    this.isDragging = false;
    this.end();
    this.drawCommandQueue.push(this.currentDrawCommand);
    this.currentDrawCommand = [];

    sendMessage({
      type: SocketMessageType.DRAWING,
      body: {
        drawingStatus: DrawingStatus.END,
      },
    });
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'z') {
      if (e.metaKey) {
        e.preventDefault();
        if (e.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }
      }
    }
  }

  clearAll() {
    this.clear();
    this.drawCommandQueue = [];
    sendMessage({
      type: SocketMessageType.DRAWING,
      body: {
        drawingStatus: DrawingStatus.CLEAR_ALL,
      },
    });
  }

  enable() {
    if (this.enabled) {
      return;
    }

    this.enabled = true;
    this.bindMouseEventHandler();
    this.bindKeyboardEventHandler();
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    this.enabled = false;
    this.unbindMouseEventHandler();
    this.unbindKeyboardEventHandler();
  }

  dispose() {
    this.unbindMouseEventHandler();
    this.unbindKeyboardEventHandler();
    this.mouseDownHandler = null;
    this.mouseMoveHandler = null;
    this.mouseUpHandler = null;
    this.keyDownHandler = null;
  }

  bindMouseEventHandler() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.addEventListener('mousedown', this.mouseDownHandler);
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);
  }

  bindKeyboardEventHandler() {
    if (!this.keyDownHandler) {
      return;
    }

    window.addEventListener('keydown', this.keyDownHandler);
  }

  unbindMouseEventHandler() {
    if (!(this.mouseDownHandler && this.mouseMoveHandler && this.mouseUpHandler)) {
      return;
    }

    this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
    this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
  }

  unbindKeyboardEventHandler() {
    if (!this.keyDownHandler) {
      return;
    }

    window.removeEventListener('keydown', this.keyDownHandler);
  }

  bindSocketEventHandler() {
    event.on(SocketMessageType.DRAWING, ({ body }: Picasso.DrawingMessage) => {
      const { drawingStatus, drawingMode, lineWidth, color, point, canvasSize } = body;

      // 출제자와 캔버스 사이즈 차이로 인한 좌표 보정 처리
      if (canvasSize) {
        this.canvasSize = this.getCanvasSize();
        this.scaleX = this.canvasSize.width / canvasSize.scrollWidth;
        this.scaleY = this.canvasSize.height / canvasSize.scrollHeight;
      }

      switch (drawingStatus) {
        case DrawingStatus.START:
          this.setConfig({
            mode: drawingMode,
            size: lineWidth,
            color,
          });
          this.startPoint = {
            x: point.x * this.scaleX,
            y: point.y * this.scaleY,
          };
          this.start();
          break;
        case DrawingStatus.DRAW:
          this.currentPoint = {
            x: point.x * this.scaleX,
            y: point.y * this.scaleY,
          };
          this.draw({
            context: this.context,
            config: this.config,
            startPoint: this.startPoint,
            currentPoint: this.currentPoint,
          });
          this.startPoint = this.currentPoint;
          break;
        case DrawingStatus.END:
          this.end();
          break;
        case DrawingStatus.CLEAR_ALL:
          this.clear();
          break;
        case DrawingStatus.UNDO:
          this.undo();
          break;
        case DrawingStatus.REDO:
          this.redo();
          break;
      }
    });
  }
}
