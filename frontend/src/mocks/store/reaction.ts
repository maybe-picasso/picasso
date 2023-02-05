import { participants } from './room';

export const reactionList = [
  {
    type: 'TYPE_A',
    timestamp: 1651629892418,
    userId: participants[0].userId,
    nickName: participants[0].nickName,
  },
  {
    type: 'TYPE_B',
    timestamp: 1651629903096,
    userId: participants[1].userId,
    nickName: participants[1].nickName,
  },
  {
    type: 'TYPE_C',
    timestamp: 1651629916795,
    userId: participants[0].userId,
    nickName: participants[0].nickName,
  },
  {
    type: 'TYPE_C',
    timestamp: 1651629892418,
    userId: participants[1].userId,
    nickName: participants[1].nickName,
  },
  {
    type: 'TYPE_D',
    timestamp: 1651629985177,
    userId: participants[1].userId,
    nickName: participants[1].nickName,
  },
];
