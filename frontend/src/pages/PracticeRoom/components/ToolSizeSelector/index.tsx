import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './index.scss';

type Props = {
  initialSize?: number;
  incrementSize?: number;
  minSize?: number;
  maxSize?: number;
  sizeChangeCallback?: (size: number) => void;
};

const ToolSizeSelector = ({
  initialSize = 1,
  incrementSize = 1,
  minSize = 1,
  maxSize = Infinity,
  sizeChangeCallback,
}: Props) => {
  const [size, setSize] = useState<number>(initialSize);

  const onSizeChangeButtonClick = useCallback(
    (direction: 'forward' | 'backward') => {
      setSize((s) => {
        const nextSize = s + (direction === 'backward' ? incrementSize * -1 : incrementSize);

        if (minSize > nextSize) {
          return minSize;
        }
        if (nextSize > maxSize) {
          return maxSize;
        }

        return nextSize;
      });
    },
    [setSize, incrementSize, minSize, maxSize]
  );

  const onSizeInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentSize = +e.target.value;
      if (minSize > currentSize) {
        setSize(minSize);
        return;
      }
      if (currentSize < maxSize) {
        return setSize(maxSize);
      }

      setSize(currentSize);
    },
    [minSize, maxSize]
  );

  useEffect(() => {
    sizeChangeCallback?.(size);
  }, [sizeChangeCallback, size]);

  return (
    <div className="tool-size-selector">
      <button className="minus" onClick={() => onSizeChangeButtonClick('backward')}>
        -
      </button>
      <input type="number" onChange={onSizeInputChange} value={size} />
      <button className="plus" onClick={() => onSizeChangeButtonClick('forward')}>
        +
      </button>
    </div>
  );
};

export default ToolSizeSelector;
