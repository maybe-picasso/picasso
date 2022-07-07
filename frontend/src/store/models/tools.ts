import { createModel } from '@rematch/core';
import { RootModel } from './';
import { COLORS, DEFAULT_LINE_SIZE, DEFAULT_LINE_OPACITY, LOCAL_STORAGE } from 'constants/index';
import { DrawingTools } from 'types/enums';
import { getStorage, setStorage } from 'helpers/storage';

export interface ToolsState {
  currentTool: DrawingTools;
  currentColor: string;
  currentSize: number;
  currentOpacity: number;
}

const { tool, color, size, opacity } = getStorage(LOCAL_STORAGE.DRAWING_TOOLS) || {};

export const initialState: ToolsState = {
  currentTool: tool || DrawingTools.PEN,
  currentColor: color || COLORS[0],
  currentSize: size || DEFAULT_LINE_SIZE,
  currentOpacity: opacity || DEFAULT_LINE_OPACITY,
};

export const tools = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    setTool(state, payload: DrawingTools) {
      const { currentColor, currentSize, currentOpacity } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: payload,
        color: currentColor,
        size: currentSize,
        opacity: currentOpacity,
      });

      return {
        ...state,
        currentTool: payload,
      };
    },
    setColor(state, payload: string) {
      const { currentTool, currentSize, currentOpacity } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: currentTool,
        color: payload,
        size: currentSize,
        opacity: currentOpacity,
      });

      return {
        ...state,
        currentColor: payload,
      };
    },
    setSize(state, payload: number) {
      const { currentTool, currentColor, currentOpacity } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: currentTool,
        color: currentColor,
        size: payload,
        opacity: currentOpacity,

      });

      return {
        ...state,
        currentSize: payload,
      };
    },
    setOpacity(state, payload: number) {
      const { currentTool, currentColor, currentSize } = state;

      setStorage(LOCAL_STORAGE.DRAWING_TOOLS, {
        tool: currentTool,
        color: currentColor,
        size: currentSize,
        opacity: payload,
      });

      return {
        ...state,
        currentOpacity: payload,
      };
    },
  },
});
