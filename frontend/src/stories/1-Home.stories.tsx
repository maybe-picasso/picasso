import { Meta, StoryObj } from '@storybook/react';

import getUserInfo from '@/mocks/apis/getUserInfo.json';
import { About, Home } from '@/pages';
import PATHS from '@/routes/paths';
import { withMockServer, withRouter } from '../../.storybook/decorators';

export default {
  title: 'Home',
} as Meta;

export const DefaultStory: StoryObj = {
  name: '홈 메인',
  render: () => <Home />,
  decorators: [
    withRouter({ url: PATHS.HOME }),
    withMockServer([
      {
        mockJson: getUserInfo,
        key: 'normal',
      },
    ]),
  ],
};

export const AboutStory: StoryObj = {
  name: '어바웃 피카소팀',
  render: () => <About />,
  decorators: [withRouter({ url: PATHS.ABOUT })],
};
