import { QUESTIONS } from 'constants/index';
import { sampleSize,throttle } from 'lodash-es';
import randomWord from 'random-words';
import { v4 as uuidv4 } from 'uuid';

const REPEAT_HOLD_TIME = 1000;
const THROTTLE_OPTIONS = {
  trailing: false, // throttle 후행 이벤트 발동 설정
};

/**
 * UUID를 반환합니다.
 */
export const getUuid = (): string => {
  return uuidv4();
};

/**
 * 룸ID에 사용할 랜덤한 단어를 반환합니다.
 */
export const getRandomRoomId = (count: number = 1): string => {
  return randomWord(count).join('-');
};

/**
 * 최대값내에 랜덤값을 반환합니다.
 */
export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};

/**
 * 랜덤 문제 배열 반환합니다.
 */
export const getRandomQuestions = (size = 10): string[] => {
  return sampleSize(QUESTIONS, size);
};

/**
 * 이벤트 쓰로틀이 적용된 함수를 반환합니다.
 */
export const getThrottledFunc = (func: any) => {
  return throttle(func, REPEAT_HOLD_TIME, THROTTLE_OPTIONS);
};

/**
 * 두 값이 같은지 비교합니다.
 */
export const compare = (a: any, b: any) => {
  return a === b;
};
