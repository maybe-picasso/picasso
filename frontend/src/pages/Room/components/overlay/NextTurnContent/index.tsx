import { Text } from '@chakra-ui/react';
import ResultLayer from '../ResultLayer';

import './index.scss';

interface Props {
  isMyTurn: boolean;
  word: string;
  painterName: string;
}

const NextTurnContent = ({ isMyTurn, word, painterName }: Props) => {
  const PainterText = (
    <Text as="p" lineHeight={1.5}>
      {painterName}님 차례에요!
      <br />
      이번 문제는
      <Text m={2} color="green.300" as="span">
        {word}
      </Text>
      입니다!
    </Text>
  );

  const GamerText = (
    <Text as="p" lineHeight={1.5}>
      <Text m={2} color="green.300" as="span">
        {painterName}
      </Text>
      님이 그림 그릴 차례입니다!
    </Text>
  );

  return <ResultLayer title={isMyTurn ? PainterText : GamerText} />;
};

export default NextTurnContent;
