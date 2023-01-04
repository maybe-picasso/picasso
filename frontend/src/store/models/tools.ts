import { createModel } from '@rematch/core';

import { COLORS, DEFAULT_LINE_SIZE, LOCAL_STORAGE } from '@/constants';
import { getStorage, setStorage } from '@/helpers/storage';
import { DrawingTools } from '@/types/enums';
import { RootModel } from './';

export interface ToolsState {
  currentTool: DrawingTools;
  currentColor: string;
  currentSize: number;
}

const { tool, color, size } = getStorage(LOCAL_STORAGE.DRAWING_TOOLS) || {};

export const initialState: ToolsState = {
  currentTool: tool || DrawingTools.PEN,
  currentColor: color || COLORS[0],
  currentSize: size || DEFAULT_LINE_SIZE,
};

export const tools = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    setTool(state, payload: DrawingTools) {
      const { currentColor, currentSize } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: payload,
        color: currentColor,
        size: currentSize,
      });

      return {
        ...state,
        currentTool: payload,
      };
    },
    setColor(state, payload: string) {
      const { currentTool, currentSize } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: currentTool,
        color: payload,
        size: currentSize,
      });

      return {
        ...state,
        currentColor: payload,
      };
    },
    setSize(state, payload: number) {
      const { currentTool, currentColor } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: currentTool,
        color: currentColor,
        size: payload,
      });

      return {
        ...state,
        currentSize: payload,
      };
    },
  },
});
