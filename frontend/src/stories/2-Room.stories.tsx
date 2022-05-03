import { Meta, StoryObj } from '@storybook/react';
import { withRouter, withRedux } from '../../.storybook/decorators';
import { Room } from 'pages';
import { 룸_기본, 룸_입장 } from 'mocks/store';
import PATHS from 'routes/paths';
// import createChannel from '@storybook/channel-websocket';

// const channel = createChannel({ url: 'ws://localhost:9001' });

export default {
  title: 'Room',
} as Meta;

export const RoomGateStory: StoryObj = {
  name: '프로필 설정',
  render: () => <Room />,
  decorators: [withRouter({ url: PATHS.ROOM }), withRedux(룸_기본)],
};

export const RoomJoinedStory: StoryObj = {
  name: '게임 화면',
  render: () => <Room />,
  decorators: [withRouter({ url: PATHS.ROOM }), withRedux(룸_입장)],
};
