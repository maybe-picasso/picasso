import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PageTemplate from 'components/PageTemplate';
import { Pen, Tool } from 'core/tools';
import ColorPicker from './components/ColorPicker';
import ToolSizeSelector from './components/ToolSizeSelector';

import './index.scss';

const PracticeRoom = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<Tool | undefined>();

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

    setCurrentTool((lastTool: Tool | undefined) => {
      lastTool?.disable();

      return new Pen({
        canvas,
        context,
        config: {
          size: 5,
        },
      });
    });
  }, [setCurrentTool]);

  useEffect(() => {
    currentTool?.enable();
  }, [currentTool]);

  const { canvasWidth, canvasHeight } = useMemo(() => {
    return {
      canvasWidth: window.innerWidth * 0.8,
      canvasHeight: window.innerHeight * 0.8,
    };
  }, []);

  const onSizeChange = useCallback(
    (size: number) => {
      currentTool?.setConfig({
        size,
      });
    },
    [currentTool]
  );

  const onColorChange = useCallback(
    (color: string) => {
      currentTool?.setConfig({
        color,
      });
    },
    [currentTool]
  );

  return (
    <PageTemplate id="practice-room">
      <div>
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
      <ToolSizeSelector sizeChangeCallback={onSizeChange} />
      <ColorPicker colorChangeCallback={onColorChange} />
    </PageTemplate>
  );
};

export default PracticeRoom;
