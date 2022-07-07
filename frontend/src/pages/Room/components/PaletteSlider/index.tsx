import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { DEFAULT_LINE_SIZE } from 'constants/index';

interface Props {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onSliderChange: (val: number) => void;
}

const PaletteSlider = ({ value = DEFAULT_LINE_SIZE, step = 1, min = 1, max = 20, onSliderChange }: Props) => {
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={value}
      min={min}
      max={max}
      step={step}
      colorScheme="teal"
      onChange={(val) => onSliderChange(val)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default PaletteSlider;
