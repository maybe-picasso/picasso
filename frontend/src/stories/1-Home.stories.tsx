import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from '../../.storybook/decorators';
import { Home } from 'pages';
import PATHS from 'routes/paths';

export default {
  title: 'Home',
} as Meta;

export const DefaultStory: StoryObj = {
  name: '기본',
  render: () => <Home />,
  decorators: [withRouter({ url: PATHS.HOME })],
};
