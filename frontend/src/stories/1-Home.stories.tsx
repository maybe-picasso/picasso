import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from '../../.storybook/decorators';
import { Home, About } from 'pages';
import PATHS from 'routes/paths';

export default {
  title: 'Home',
} as Meta;

export const DefaultStory: StoryObj = {
  name: '홈 메인',
  render: () => <Home />,
  decorators: [withRouter({ url: PATHS.HOME })],
};

export const AboutStory: StoryObj = {
  name: '어바웃 피카소팀',
  render: () => <About />,
  decorators: [withRouter({ url: PATHS.ABOUT })],
};
