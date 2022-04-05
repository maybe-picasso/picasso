import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { select } from 'store';
import { Pen } from 'core/tools';
import './index.scss';

export let pen: Pen;

const CanvasContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { selectedColor, selectedTool } = useSelector(select.tools.state);

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

    if (!pen) {
      pen = new Pen({
        canvas,
        context,
        config: {
          size: 2,
        },
      });
    }

    pen.enable();
  }, []);

  useEffect(() => {
    pen.setConfig({
      color: selectedColor,
    });
  }, [selectedColor]);

  useEffect(() => {
    //
  }, [selectedTool]);

  return <canvas ref={canvasRef} width={size.width} height={size.height} />;
};

export default CanvasContainer;
