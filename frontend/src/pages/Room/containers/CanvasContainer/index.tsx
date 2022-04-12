import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { select } from 'store';
import { Drawing } from 'core/drawing';
import './index.scss';

export let drawing: Drawing;

const CanvasContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { currentColor, currentTool, currentSize } = useSelector(select.tools.state);

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
        config: {
          size: 2,
        },
      });
    }

    drawing.enable();
  }, []);

  useEffect(() => {
    drawing.setConfig({
      color: currentColor,
    });
  }, [currentColor]);

  useEffect(() => {
    drawing.setConfig({
      size: currentSize,
    });
  }, [currentSize]);

  useEffect(() => {
    drawing.setConfig({
      mode: currentTool,
    });
  }, [currentTool]);

  return <canvas ref={canvasRef} width={size.width} height={size.height} />;
};

export default CanvasContainer;
