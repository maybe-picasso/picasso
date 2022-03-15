import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const PaletteSlider = () => {
  return (
    <Slider aria-label="slider-ex-1" defaultValue={30}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default PaletteSlider;
