import { Meta, StoryObj } from '@storybook/react';
import { withRouter, withRedux } from '../../.storybook/decorators';
import { Room } from 'pages';
import { 룸_프로필설정, 룸_게임화면, 룸_게임완료, 룸_게임종료, 룸_게임정답자표시 } from 'mocks/store';
import PATHS from 'routes/paths';

export default {
  title: 'Room',
} as Meta;

const router = withRouter({
  url: PATHS.ROOM.replace(':roomId', 'abc'),
});

export const GameProfileStory: StoryObj = {
  name: '프로필 설정',
  render: () => <Room />,
  decorators: [router, withRedux(룸_프로필설정)],
};

export const GameDefaultStory: StoryObj = {
  name: '게임 화면',
  render: () => <Room />,
  decorators: [router, withRedux(룸_게임화면)],
};

export const GameCorrectStory: StoryObj = {
  name: '게임 정답자 표시',
  render: () => <Room />,
  decorators: [router, withRedux(룸_게임정답자표시)],
};

export const GameCompleteStory: StoryObj = {
  name: '게임 라운드별 완료',
  render: () => <Room />,
  decorators: [router, withRedux(룸_게임완료)],
};

export const GameOverStory: StoryObj = {
  name: '게임 전체 라운드 종료',
  render: () => <Room />,
  decorators: [router, withRedux(룸_게임종료)],
};
