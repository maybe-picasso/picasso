export enum SocketMessageType {
  CHAT = 'CHAT',
  DRAWING = 'DRAWING',
  CORRECT_USER = 'CORRECT_USER',
}

export enum DrawingTools {
  PEN = 'PEN',
  ERASER = 'ERASER',
  CLEAR_ALL = 'CLEAR_ALL',
}

export enum DrawingStatus {
  START = 'START',
  DRAW = 'DRAW',
  END = 'END',
  CLEAR_ALL = 'CLEAR_ALL',
}

export enum GameStatus {
  WAITING = 'WAITING', // 참여자 대기
  STANDBY = 'STANDBY', // 게임 시작 조건 만족 후 게임 시작 전 상태
  PLAYING = 'PLAYING', // 게임 진행중
  COMPLETED = 'COMPLETED', // 한 단어 완료
  GAMEOVER = 'GAMEOVER', // 게임 종료
}
