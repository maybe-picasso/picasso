import { Meta, StoryObj } from '@storybook/react';

import {
  게임_다음턴안내_출제자,
  게임_다음턴안내_플레이어,
  게임_대기화면,
  게임_라운드완료,
  게임_마지막라운드,
  게임_문제푸는사람,
  게임_서둘러,
  게임_유저목록로딩,
  게임_정답자표시,
  게임_종료,
  게임_플레이어_준비,
  게임_현재페인터,
  프로필설정,
} from '@/mocks/store';
import { Room } from '@/pages';
import PATHS from '@/routes/paths';
import { withRedux, withRouter } from '../../.storybook/decorators';

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

export const GameLoadingStory: StoryObj = {
  name: '게임 진입 로딩',
  decorators: [router, withRedux(게임_유저목록로딩)],
};

export const GameDefaultStory: StoryObj = {
  name: '게임 대기 화면',
  decorators: [router, withRedux(게임_대기화면)],
};

export const GameReadyStory: StoryObj = {
  name: '게임 시작 준비',
  decorators: [router, withRedux(게임_플레이어_준비)],
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

export const GamePlayerStory: StoryObj = {
  name: '게임 문제 푸는 사람',
  decorators: [router, withRedux(게임_문제푸는사람)],
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

export const GamePlayerHurryUpStory: StoryObj = {
  name: '게임 서둘러!',
  decorators: [router, withRedux(게임_서둘러)],
};
