import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';

import { DEFAULT_LINE_SIZE } from '@/constants';

interface Props {
  value?: number;
  max?: number;
  onSliderChange: (val: number) => void;
}

const PaletteSlider = ({ value = DEFAULT_LINE_SIZE, max, onSliderChange }: Props) => {
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={value}
      min={1}
      max={max}
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
