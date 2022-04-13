import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import './index.scss';

interface Props {
  color: string;
  selected: boolean;
  onClick?: (color: string) => void;
}

const PaletteColor = ({ color, selected, onClick }: Props) => {
  return (
    <Box className={cn('palette-card', { selected })} backgroundColor={color} onClick={() => onClick?.(color)}></Box>
  );
};

export default PaletteColor;
