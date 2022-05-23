export enum SocketMessageType {
  CHAT = 'CHAT',
  DRAWING = 'DRAWING',
}

export enum DrawingTools {
  PEN = 'PEN',
  ERASER = 'ERASER',
  CLEAR_ALL = 'CLEAR_ALL',
}

export enum DrawingStatusType {
  START = 'START',
  DRAW = 'DRAW',
  END = 'END',
  CLEAR_ALL = 'CLEAR_ALL',
}

export enum GameStatus {
  WAITING = 'WAITING', // 게임 시작 대기
  PLAYING = 'PLAYING', // 게임 진행중
  COMPLETED = 'COMPLETED', // 한 단어 완료
  GAMEOVER = 'GAMEOVER', // 게임 종료
}
