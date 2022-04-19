import { useState, useCallback, useMemo, useRef } from 'react';
import {
  Container,
  Heading,
  Stack,
  Box,
  Input,
  Button,
  RadioGroup,
  Radio,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { BsArrowRightCircleFill, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useMotion } from 'hooks';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'store';
import { getUuid } from 'helpers/utils';
import { PROFILE_CHARACTERS } from 'constants/index';
import socket from 'core/socket';

import './index.scss';

interface Props {
  roomId: string;
}

const GateContainer = ({ roomId }: Props) => {
  const [profileIndex, setProfileIndex] = useState(1);
  const [drawTime, setDrawTime] = useState('60');
  const [round, setRound] = useState('10');

  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const isPrevDisabled = useMemo(() => profileIndex === 0, [profileIndex]);
  const isNextDisabled = useMemo(() => profileIndex === PROFILE_CHARACTERS.length - 1, [profileIndex]);
  const defaultNickName = localStorage.getItem('nickName') || '';

  // 프로필 설정 애니메이션
  const { controls } = useMotion({ deps: [profileIndex] });

  const getRandomProfile = useCallback(() => {
    const index = Math.floor(Math.random() * PROFILE_CHARACTERS.length);
    setProfileIndex(index);
  }, [setProfileIndex]);

  const handlePrevProfile = useCallback(() => {
    setProfileIndex((index) => index - 1);
  }, [setProfileIndex]);

  const handleNextProfile = useCallback(() => {
    setProfileIndex((index) => index + 1);
  }, [setProfileIndex]);

  const handleEnterRoom = useCallback(() => {
    const nickName = inputRef.current?.value;
    if (!nickName) {
      alert('닉네임을 입력해주세요!');
      return;
    }

    const userInfo = {
      userId: getUuid(),
      nickName,
      profileUrl: profileIndex,
    };

    socket.emit('join', { roomId, userInfo });
    dispatch.room.setUserInfo(userInfo);
    dispatch.room.setJoinedState(true);
    window.localStorage.setItem('nickName', nickName);
  }, [dispatch, roomId, profileIndex, inputRef]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnterRoom();
      }
    },
    [handleEnterRoom]
  );

  return (
    <Container alignContent="center" className="gate-container">
      <Box>
        <Stack spacing={5}>
          <Heading as="h1" size="xl">
            프로필 설정
          </Heading>
          <Input
            variant="outline"
            placeholder="닉네임을 입력해주세요!"
            defaultValue={defaultNickName}
            maxLength={15}
            textAlign="center"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            required
          />

          <Grid templateColumns="repeat(5, 1fr)" alignItems="center" gap={6}>
            <IconButton
              colorScheme="teal"
              aria-label="이전"
              icon={<BsArrowLeft />}
              disabled={isPrevDisabled}
              onClick={handlePrevProfile}
            />
            <GridItem colSpan={3} textAlign="center">
              <motion.div animate={controls}>
                <Text fontSize="7xl">{PROFILE_CHARACTERS[profileIndex]}</Text>
              </motion.div>
            </GridItem>

            <IconButton
              colorScheme="teal"
              aria-label="다음"
              icon={<BsArrowRight />}
              disabled={isNextDisabled}
              onClick={handleNextProfile}
            />
          </Grid>
          <Button
            rightIcon={<GiPerspectiveDiceSixFacesRandom />}
            onClick={getRandomProfile}
            colorScheme="teal"
            size="lg"
            variant="outline"
          >
            랜덤 프로필
          </Button>
        </Stack>

        <Stack spacing={5} mt={50}>
          <Heading as="h2" size="md">
            게임 설정
          </Heading>

          <Divider />
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Heading as="h3" size="sm">
              그리는 시간
            </Heading>

            <RadioGroup colorScheme="teal" onChange={setDrawTime} value={drawTime}>
              <Stack direction="row" spacing={5}>
                <Radio value="30">30초</Radio>
                <Radio value="60">1분</Radio>
                <Radio value="120">2분</Radio>
              </Stack>
            </RadioGroup>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Heading as="h3" size="sm">
              라운드 수
            </Heading>

            <RadioGroup colorScheme="teal" onChange={setRound} value={round}>
              <Stack direction="row" spacing={5}>
                <Radio value="5">5</Radio>
                <Radio value="10">10</Radio>
                <Radio value="15">15</Radio>
              </Stack>
            </RadioGroup>
          </Grid>

          <Button
            rightIcon={<BsArrowRightCircleFill />}
            colorScheme="teal"
            size="lg"
            variant="solid"
            onClick={handleEnterRoom}
          >
            입장하기
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default GateContainer;
