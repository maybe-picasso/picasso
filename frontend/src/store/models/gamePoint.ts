import { createModel } from '@rematch/core';
import { RootModel } from './';

export interface GamePointState {
  correctUserList: Picasso.CorrectUserInfo[]; // 현재 라운드의 정답자 포인트
}

// 점수 가산 방식
// 조건1. 3위까지는 남은 시간의 2배, 1.5배, 1.2배 4위 부터 1.0
// 조건2. 참여자수 가산점
const RANK_POINT_BASE: Record<number, number> = {
  1: 2,
  2: 1.5,
  3: 1.2,
  99: 1.0,
};

export const initialState: GamePointState = {
  correctUserList: [],
};

export const gamePoint = createModel<RootModel>()({
  state: initialState,
  selectors: (slice) => ({
    state: () => slice,
  }),
  reducers: {
    addCorrectUserInfo(state, payload: Picasso.CorrectUserInfo) {
      state.correctUserList.push(payload);
      return state;
    },
    resetCorrectUserInfo(state) {
      state.correctUserList = [];
      return state;
    },
  },
  effects: (dispatch) => ({
    correctUser({ userId }, rootState) {
      const { room, game, gamePoint } = rootState;
      const { correctUserList } = gamePoint;
      const { participants } = room;
      const { time } = game;
      const ranking = correctUserList.length + 1;
      const rankingPoint = RANK_POINT_BASE[ranking < 4 ? ranking : 99];
      const participantsPoint = participants.length * 10;
      const point = Math.round(time * rankingPoint + participantsPoint);

      // 현재 라운드 포인트 정보 추가
      dispatch.gamePoint.addCorrectUserInfo({
        userId,
        point,
        time,
      });

      // 사용자의 기존 포인트 정보에 추가
      // TODO: 서버 API로 대체 예정
      dispatch.room.updateUserPoint({
        userId,
        roundPoint: point,
      });
    },
  }),
});
