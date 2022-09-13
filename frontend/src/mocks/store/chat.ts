import { participants } from './room';

export const chatList = [
  {
    message: '하이하이~~~~',
    timestamp: 1651629892418,
    isMine: true,
    userId: participants[0].userId,
    nickName: participants[0].nickName,
  },
  {
    message: '고고~~',
    timestamp: 1651629903096,
    userId: participants[1].userId,
    nickName: participants[1].nickName,
  },
  {
    message: '꼬 해봅시다~~~',
    timestamp: 1651629916795,
    isMine: true,
    userId: participants[0].userId,
    nickName: participants[0].nickName,
  },
  {
    message: 'ㅎㅎㅎㅎ',
    timestamp: 1651629892418,
    isMine: true,
    userId: participants[1].userId,
    nickName: participants[1].nickName,
  },
  {
    message: '쉬운것부터!!',
    timestamp: 1651629985177,
    userId: participants[1].userId,
    nickName: participants[1].nickName,
  },
  {
    message: '내가 1등!!',
    timestamp: 1651629985178,
    userId: participants[2].userId,
    nickName: participants[2].nickName,
  },
  {
    isSystem: true,
    message: '그리기중 ooo님이 나갔습니다.\n곧 다음 차례가 시작됩니다.',
    timestamp: 1651629985278,
    userId: '',
    nickName: '',
  },
];
