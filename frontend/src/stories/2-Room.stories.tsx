import { Meta, StoryObj } from '@storybook/react';
import { withRouter, withRedux } from '../../.storybook/decorators';
import { Room } from 'pages';
import {
  프로필설정,
  게임_기본화면,
  게임_대기화면,
  게임_다음턴안내_출제자,
  게임_다음턴안내_플레이어,
  게임_현재페인터,
  게임_문제푸는사람,
  게임_서둘러,
  게임_정답자표시,
  게임_라운드완료,
  게임_마지막라운드,
  게임_종료,
} from 'mocks/store';
import PATHS from 'routes/paths';

export default {
  title: 'Room',
  render: () => <Room />,
} as Meta;

const router = withRouter({
  url: PATHS.ROOM.replace(':roomId', 'abc'),
});

export const GameProfileStory: StoryObj = {
  name: '프로필 설정',
  decorators: [router, withRedux(프로필설정)],
};

export const GameDefaultStory: StoryObj = {
  name: '게임 대기 화면',
  decorators: [router, withRedux(게임_대기화면)],
};

export const GameNextMyTurnStory: StoryObj = {
  name: '게임 다음 턴 안내(출제자)',
  decorators: [router, withRedux(게임_다음턴안내_출제자)],
};

export const GameNextTurnStory: StoryObj = {
  name: '게임 다음 턴 안내(플레이어)',
  decorators: [router, withRedux(게임_다음턴안내_플레이어)],
};

export const GamePainterStory: StoryObj = {
  name: '게임 현재 페인터',
  decorators: [router, withRedux(게임_현재페인터)],
};

export const GameCorrectStory: StoryObj = {
  name: '게임 정답자 표시',
  decorators: [router, withRedux(게임_정답자표시)],
};

export const GameCompleteStory: StoryObj = {
  name: '게임 라운드별 완료',
  decorators: [router, withRedux(게임_라운드완료)],
};

export const GameOverStory: StoryObj = {
  name: '게임 전체 라운드 종료',
  decorators: [router, withRedux(게임_종료)],
};

export const GameLastRoundStory: StoryObj = {
  name: '게임 마지막 라운드',
  decorators: [router, withRedux(게임_마지막라운드)],
};

export const GamePlayerStory: StoryObj = {
  name: '게임 문제 푸는 사람',
  decorators: [router, withRedux(게임_문제푸는사람)],
};

export const GamePlayerHurryUpStory: StoryObj = {
  name: '게임 서둘러!',
  decorators: [router, withRedux(게임_서둘러)],
};
