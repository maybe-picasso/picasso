import { createModel } from '@rematch/core';
import { RootModel } from './';
import { COLORS, DEFAULT_LINE_SIZE } from 'constants/index';
import { DrawingTools } from 'types/enums';

interface ToolsState {
  currentTool: DrawingTools;
  currentColor: string;
  currentSize: number;
}

const initialState: ToolsState = {
  currentTool: DrawingTools.PEN,
  currentColor: COLORS[0],
  currentSize: DEFAULT_LINE_SIZE,
};

export const tools = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    setTool(state, payload: DrawingTools) {
      state.currentTool = payload;
      return state;
    },
    setColor(state, payload: string) {
      state.currentColor = payload;
      return state;
    },
    setSize(state, payload: number) {
      state.currentSize = payload;
      return state;
    },
  },
});
