import { Box } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import cn from 'classnames';
import './index.scss';

interface Props {
  color: string;
  selected: boolean;
  onClick?: (color: string) => void;
}

const PaletteColor = ({ color, selected, onClick }: Props) => {
  const isWhiteColor = color === '#ffffff';

  return (
    <Box className={cn('palette-card', { selected })} backgroundColor={color} onClick={() => onClick?.(color)}>
      {selected && (
        <span className="icon-checked">
          <CheckIcon color={isWhiteColor ? '#000' : '#fff'} w={3} h={3} />
        </span>
      )}
    </Box>
  );
};

export default PaletteColor;
