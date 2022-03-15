import { useCallback } from 'react';
import { Grid, GridItem, Button, Stack } from '@chakra-ui/react';
import { PaletteSlider, PaletteColor } from 'pages/Room/components';
import { COLORS } from 'constants/index';
import { DrawingTools } from 'types/enums';

import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import './index.scss';

const ToolsContainer = () => {
  const { selectedColor, selectedTool } = useSelector(select.tools.state);
  const dispatch = useDispatch<Dispatch>();

  const handleDrawTool = useCallback(
    (name: any) => {
      dispatch.tools.setTool(name);
    },
    [dispatch]
  );

  const handleColor = useCallback(
    (color: string) => {
      dispatch.tools.setColor(color);
    },
    [dispatch]
  );

  return (
    <Grid h="100%" padding={1} templateRows="repeat(3, 1fr)" templateColumns="repeat(1, 1fr)">
      <GridItem w="100%" mb={1} rowSpan={1} colSpan={1}>
        <Stack direction="row" spacing={2} align="center">
          {Object.keys(DrawingTools).map((name) => (
            <Button
              isActive={name === selectedTool}
              colorScheme="teal"
              variant="outline"
              _active={{
                bg: '#7fdbff',
                borderColor: '#bec3c9',
              }}
              onClick={() => handleDrawTool(name)}
            >
              {name}
            </Button>
          ))}
        </Stack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PaletteSlider />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        {COLORS.map((color) => (
          <PaletteColor color={color} selected={color === selectedColor} onClick={handleColor} />
        ))}
      </GridItem>
    </Grid>
  );
};

export default ToolsContainer;
