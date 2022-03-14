import { createModel } from '@rematch/core';
import { RootModel } from './';
import { COLORS } from 'constants/index';
import { DrawingTools } from 'types/enums';

interface ToolsState {
  selectedTool: DrawingTools;
  selectedColor: string;
}

const initialState: ToolsState = {
  selectedTool: DrawingTools.PEN,
  selectedColor: COLORS[0],
};

export const tools = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    setTool(state, payload: DrawingTools) {
      console.log('setColor :>> ', payload);
      state.selectedTool = payload;
      return state;
    },
    setColor(state, payload: string) {
      state.selectedColor = payload;
      return state;
    },
  },
});
