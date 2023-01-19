import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, GridItem, Stack } from '@chakra-ui/react';

import { COLORS } from '@/constants';
import { PaletteColor, PaletteSlider } from '@/pages/Room/components';
import { Dispatch, select } from '@/store';
import { DrawingTools } from '@/types/enums';
import { drawing } from '../CanvasContainer';

import './index.scss';

const BRUSH_MAX_SIZE = 30;

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
          <GridItem
            w="100%"
            mb={{ lg: '10px' }}
            rowSpan={{ base: 1, lg: 2 }}
            colSpan={{ base: 1, lg: 1 }}
            className="tool-type-wrap"
          >
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
          <GridItem className="brush-control" rowSpan={{ base: 2, lg: 1 }} colSpan={{ base: 1, lg: 1 }}>
            <div className="brush-size" style={{ width: BRUSH_MAX_SIZE, height: BRUSH_MAX_SIZE }}>
              <span
                style={{
                  backgroundColor: currentColor,
                  transform: `scale(${0.2 + currentSize / (BRUSH_MAX_SIZE / 1.7)})`,
                }}
              />
            </div>
            <PaletteSlider value={currentSize} onSliderChange={handleSlider} max={BRUSH_MAX_SIZE} />
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
