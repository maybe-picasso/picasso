import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { select } from 'store';
import { useMyTurn, useGameStatus } from '../../hooks';
import { Drawing } from 'core/drawing';
import { DrawingTools } from 'types/enums';
import './index.scss';

export let drawing: Drawing;

const CanvasContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { currentColor, currentTool, currentSize, currentOpacity } = useSelector(select.tools.state);
  const { isWaiting } = useGameStatus();
  const isMyTurn = useMyTurn();

  const isPainterMode = isMyTurn || isWaiting;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('컨텍스트를 가져오는데에 실패하였습니다.');
      return;
    }

    setSize({
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    });

    if (!drawing) {
      drawing = new Drawing({
        canvas,
        context,
      });
    }

    drawing.enable();
  }, []);

  useEffect(() => {
    if (isPainterMode) {
      drawing.enable();
    } else {
      drawing.disable();
    }
  }, [isPainterMode]);

  useEffect(() => {
    drawing.setConfig({
      color: currentColor,
    });
  }, [currentColor, isPainterMode]);

  useEffect(() => {
    drawing.setConfig({
      size: currentSize,
      opacity: currentOpacity,
    });
  }, [currentSize, currentOpacity, isPainterMode]);

  useEffect(() => {
    drawing.setConfig({
      mode: currentTool,
    });
  }, [currentTool, isPainterMode]);

  const isEraserTool = currentTool === DrawingTools.ERASER;

  return (
    <canvas
      id="drawingCanvas"
      className={cn({ pen: isPainterMode, eraser: isEraserTool })}
      ref={canvasRef}
      width={size.width}
      height={size.height}
    />
  );
};

export default CanvasContainer;
