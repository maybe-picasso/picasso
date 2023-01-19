export const LOCAL_STORAGE = {
  NICK_NAME: 'nickName',
  DRAWING_TOOLS: 'drawingTools',
  TOKEN: 'token',
};

/**
 * 로컬스토리지 쓰기
 * @param key
 * @param value
 */
export function setStorage(key: string, value: any): void {
  value = JSON.stringify(value);
  localStorage[key] = value;
}

/**
 * 로컬스토리지 읽기
 * @param key
 */
export function getStorage(key: string): any {
  let value = localStorage[key];
  if (!value) {
    console.info(`localStorage에 ${key}는 없습니다.`);
    return null;
  }

  try {
    value = JSON.parse(value);
  } catch (error) {
    console.error('getStorage catch(error)', error);
  }

  return value;
}

/**
 * 로컬스토리지 특정 key 데이터 삭제
 * @param key
 */
export function deleteStorage(key: string): void {
  localStorage.removeItem(key);
}
