import { useCallback } from 'react';
import { Grid, GridItem, Button, Stack, Text } from '@chakra-ui/react';
import { PaletteSlider, PaletteColor } from 'pages/Room/components';
import { COLORS } from 'constants/index';
import { DrawingTools } from 'types/enums';

import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';
import { drawing } from '../CanvasContainer';

import './index.scss';

const ToolsContainer = () => {
  const { currentColor, currentTool, currentSize, currentOpacity } = useSelector(select.tools.state);
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

  const handleSliderSize = useCallback(
    (val: number) => {
      dispatch.tools.setSize(val);
    },
    [dispatch]
  );

  const handleSliderOpacity = useCallback(
    (val: number) => {
      dispatch.tools.setOpacity(val);
    },
    [dispatch]
  );

  return (
    <Grid h="100%" p="10px" templateRows="repeat(3, 1fr)" templateColumns="repeat(1, 1fr)">
      <GridItem w="100%" mb={3} rowSpan={1} colSpan={1} className="tool-type-wrap">
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
      <GridItem rowSpan={1} colSpan={1} mb={1} display="flex" alignItems='center'>
        <Text fontSize='xs' width={120}>브러쉬 크기 <strong>{currentSize}</strong></Text>
        <PaletteSlider value={currentSize} max={50} onSliderChange={handleSliderSize} />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} mb={1} display="flex" alignItems='center'>
        <Text fontSize='xs' width={120}>투명도 <strong>{Math.floor(currentOpacity * 100)}%</strong></Text>
        <PaletteSlider value={currentOpacity} min={0} max={1} step={0.01} onSliderChange={handleSliderOpacity} />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        {COLORS.map((color) => (
          <PaletteColor key={color} color={color} selected={color === currentColor} onClick={handleColor} />
        ))}
      </GridItem>
    </Grid>
  );
};

export default ToolsContainer;
