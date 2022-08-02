import { useCallback } from 'react';
import { Grid, GridItem, Button, Stack } from '@chakra-ui/react';
import { PaletteSlider, PaletteColor } from 'pages/Room/components';
import { COLORS } from 'constants/index';
import { DrawingTools } from 'types/enums';

import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { drawing } from '../CanvasContainer';

import './index.scss';

const ToolsContainer = () => {
  const { currentColor, currentTool, currentSize } = useSelector(select.tools.state);
  const dispatch = useDispatch<Dispatch>();

  const handleDrawingTool = useCallback(
    (name: DrawingTools) => {
      if (name === DrawingTools.CLEAR_ALL) {
        drawing.clearAll();
        dispatch.tools.setTool(DrawingTools.PEN);
      } else {
        dispatch.tools.setTool(name);
      }
    },
    [dispatch]
  );

  const handleColor = useCallback(
    (color: string) => {
      dispatch.tools.setColor(color);
    },
    [dispatch]
  );

  const handleSlider = useCallback(
    (val: number) => {
      dispatch.tools.setSize(val);
    },
    [dispatch]
  );

  return (
    <Grid
      h="100%"
      p={{ base: 0, lg: '10px 10px 0' }}
      templateRows={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)' }}
    >
      <GridItem rowSpan={2} colSpan={1}>
        <Grid
          templateRows={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
        >
          <GridItem w="100%" rowSpan={{ base: 1, lg: 2 }} colSpan={{ base: 1, lg: 1 }} className="tool-type-wrap">
            <Stack direction="row" spacing={2} align="center">
              {Object.keys(DrawingTools).map((name) => (
                <Button
                  key={name}
                  className={name}
                  isActive={name === currentTool}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDrawingTool(name as DrawingTools)}
                >
                  {name}
                </Button>
              ))}
            </Stack>
          </GridItem>
          <GridItem rowSpan={{ base: 2, lg: 1 }} colSpan={{ base: 1, lg: 1 }}>
            <PaletteSlider value={currentSize} onSliderChange={handleSlider} />
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem rowSpan={1} colSpan={{ base: 2, lg: 1 }}>
        {COLORS.map((color) => (
          <PaletteColor key={color} color={color} selected={color === currentColor} onClick={handleColor} />
        ))}
      </GridItem>
    </Grid>
  );
};

export default ToolsContainer;
