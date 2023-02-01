export enum SocketMessageType {
  CHAT = 'CHAT',
  REACTION = 'REACTION',
  DRAWING = 'DRAWING',
  CORRECT_USER = 'CORRECT_USER',
  READY_PLAYER = 'READY_PLAYER',
  SYNC_GAME_STATUS = 'SYNC_GAME_STATUS',
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
  UNDO = 'UNDO',
  REDO = 'REDO',
}

export enum GameStatus {
  WAITING_PLAYER = 'WAITING_PLAYER', // 참여자 대기
  WAITING_READY = 'WAITING_READY', // 시작 준비 현황
  STANDBY_TURN = 'STANDBY_TURN', // 문제 준비 상태
  PLAYING = 'PLAYING', // 게임 진행중
  COMPLETED = 'COMPLETED', // 한 단어 완료
  GAMEOVER = 'GAMEOVER', // 게임 종료
}
