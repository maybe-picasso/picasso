import { Meta, StoryObj } from '@storybook/react';
import { withRouter, withRedux } from '../../.storybook/decorators';
import { Room } from 'pages';
import { 룸_프로필설정, 룸_게임화면 } from 'mocks/store';
import PATHS from 'routes/paths';

export default {
  title: 'Room',
} as Meta;

export const GameProfileStory: StoryObj = {
  name: '프로필 설정',
  render: () => <Room />,
  decorators: [
    withRouter({
      url: PATHS.ROOM,
    }),
    withRedux(룸_프로필설정),
  ],
};

export const GameDefaultStory: StoryObj = {
  name: '게임 화면',
  render: () => <Room />,
  decorators: [
    withRouter({
      url: PATHS.ROOM,
    }),
    withRedux(룸_게임화면),
  ],
};
