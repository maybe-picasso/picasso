import { v4 as uuidv4 } from 'uuid';
import { throttle } from 'lodash-es';
import randomWord from 'random-words';

const REPEAT_HOLD_TIME = 1000;
const THROTTLE_OPTIONS = {
  trailing: false, // throttle 후행 이벤트 발동 설정
};

/**
 * UUID를 반환합니다.
 */
export const getUuid = () => {
  return uuidv4();
};

/**
 * 룸ID에 사용할 랜덤한 단어를 반환합니다.
 */
export const getRandomRoomId = (count: number = 1) => {
  return randomWord(count).join('-');
};

/**
 * 이벤트 쓰로틀이 적용된 함수를 반환합니다.
 */
export const getThrottledFunc = (func: any) => {
  return throttle(func, REPEAT_HOLD_TIME, THROTTLE_OPTIONS);
};
