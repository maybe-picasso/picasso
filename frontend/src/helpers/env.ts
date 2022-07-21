import { homepage } from '../../package.json';

export const isNodeProdcution: boolean = process.env.NODE_ENV === 'production';
export const isStorybook: boolean = process.env.STORYBOOK === 'true';
export const basename = isNodeProdcution ? homepage : '';
