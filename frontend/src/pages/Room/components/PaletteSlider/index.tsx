import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { DEFAULT_LINE_SIZE } from 'constants/index';

interface Props {
  onSliderChange: (val: number) => void;
}

const PaletteSlider = ({ onSliderChange }: Props) => {
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={DEFAULT_LINE_SIZE}
      min={0}
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
