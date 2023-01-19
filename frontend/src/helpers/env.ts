import { homepage } from '../../package.json';

export const isNodeProdcution: boolean = process.env.NODE_ENV === 'production';
export const isStorybook: boolean = process.env.STORYBOOK === 'true';
export const basename = isNodeProdcution ? homepage : '';
export const apiServer = isNodeProdcution ? 'https://maybe-picasso.herokuapp.com' : 'http://localhost:3000';
export const socketServer = isNodeProdcution ? 'wss://maybe-picasso.herokuapp.com' : 'ws://localhost:3000';
