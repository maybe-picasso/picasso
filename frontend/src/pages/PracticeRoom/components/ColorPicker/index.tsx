import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './index.scss';

type Props = {
  initialColor?: string;
  colorChangeCallback?: (color: string) => void;
};

const ColorPicker = ({ initialColor = 'black', colorChangeCallback }: Props) => {
  const [color, setColor] = useState<string>(initialColor);

  const onColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const currentColor = e.target.value;
    setColor(currentColor);
  }, []);

  useEffect(() => {
    colorChangeCallback?.(color);
  }, [colorChangeCallback, color]);

  return (
    <div className="color-picker">
      <input type="color" onChange={onColorChange} value={color} />
    </div>
  );
};

export default ColorPicker;
