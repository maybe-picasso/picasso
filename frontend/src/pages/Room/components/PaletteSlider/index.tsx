import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { DEFAULT_LINE_SIZE } from 'constants/index';

interface Props {
  value?: number;
  onSliderChange: (val: number) => void;
}

const PaletteSlider = ({ value = DEFAULT_LINE_SIZE, onSliderChange }: Props) => {
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={value}
      min={1}
      max={20}
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
