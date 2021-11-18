import { useState, useCallback, useEffect, useMemo } from 'react';
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
import { motion, useAnimation } from 'framer-motion';

import PageTemplate from '../../components/PageTemplate';

import './index.scss';

/**
 * @TODO
 * - 입장하기 버튼 활성화 조건 체크
 */
const PROFILE_CHARACTERS = ['🐶', '🐱', '🐰', '🦊', '🐨', '🐼', '🐯', '🐥', '🐷'];

const Setting = () => {
  const [drawTime, setDrawTime] = useState('60');
  const [round, setRound] = useState('10');
  const [myProfileIdx, setMyProfileIdx] = useState(1);

  // 프로필 설정 애니메이션
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      opacity: [0.5, 1],
      scale: [0.7, 1.1, 1],
      y: [15, -10, 0],
      transition: {
        delay: 1,
        x: { type: 'spring', stiffness: 50, velocity: 50 },
        default: { duration: 0.5 },
      },
    });
  }, [myProfileIdx, controls]);

  const getRandomProfile = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * PROFILE_CHARACTERS.length);
    setMyProfileIdx(randomIdx);
  }, [setMyProfileIdx]);

  const handlePrevProfile = useCallback(() => {
    setMyProfileIdx((myProfileIdx) => myProfileIdx - 1);
  }, [setMyProfileIdx]);

  const handleNextProfile = useCallback(() => {
    setMyProfileIdx((myProfileIdx) => myProfileIdx + 1);
  }, [setMyProfileIdx]);

  const isPrevDisabled = useMemo(() => myProfileIdx === 0, [myProfileIdx]);
  const isNextDisabled = useMemo(() => myProfileIdx === PROFILE_CHARACTERS.length - 1, [myProfileIdx]);

  return (
    <PageTemplate id="setting">
      <Container p={15} centerContent>
        <Box maxW="3xl">
          <Stack spacing={5} mt={50}>
            <Heading as="h1" size="2xl">
              프로필 설정
            </Heading>
            <Input variant="outline" placeholder="닉네임" />

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
                  <Text fontSize="7xl">{PROFILE_CHARACTERS[myProfileIdx]}</Text>
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
            <Heading as="h2" size="xl">
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

            <Button rightIcon={<BsArrowRightCircleFill />} colorScheme="teal" size="lg" variant="solid">
              입장하기
            </Button>
          </Stack>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default Setting;
