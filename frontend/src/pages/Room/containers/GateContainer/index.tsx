import { useCallback, useMemo, useRef,useState } from 'react';
import { BsArrowLeft, BsArrowRight,BsArrowRightCircleFill } from 'react-icons/bs';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { LOCAL_STORAGE,PROFILE_CHARACTERS } from 'constants/index';
import socket from 'core/socket';
import { motion } from 'framer-motion';
import { getStorage,setStorage } from 'helpers/storage';
import { getRandomNumber,getUuid } from 'helpers/utils';
import { useMotion } from 'hooks';
import { Dispatch } from 'store';
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import './index.scss';

interface Props {
  roomId: string;
}

const GateContainer = ({ roomId }: Props) => {
  const randomIndex = getRandomNumber(PROFILE_CHARACTERS.length);
  const [profileIndex, setProfileIndex] = useState(randomIndex);
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const isPrevDisabled = useMemo(() => profileIndex === 0, [profileIndex]);
  const isNextDisabled = useMemo(() => profileIndex === PROFILE_CHARACTERS.length - 1, [profileIndex]);
  const defaultNickName = getStorage(LOCAL_STORAGE.NICK_NAME) || '';

  // 프로필 설정 애니메이션
  const { controls } = useMotion({ deps: [profileIndex] });

  const getRandomProfile = useCallback(() => {
    const index = getRandomNumber(PROFILE_CHARACTERS.length);
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

    const userInfo: Picasso.UserInfo = {
      userId: getUuid(),
      nickName,
      profileIndex,
    };

    socket.emit('join', { roomId, userInfo });
    dispatch.room.setUserInfo(userInfo);
    dispatch.room.setJoinedState(true);
    setStorage(LOCAL_STORAGE.NICK_NAME, nickName);
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
      <FormControl>
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
          <Divider />
          <Button
            type="submit"
            rightIcon={<BsArrowRightCircleFill />}
            colorScheme="teal"
            size="lg"
            variant="solid"
            onClick={handleEnterRoom}
          >
            입장하기
          </Button>
        </Stack>
      </FormControl>
    </Container>
  );
};

export default GateContainer;
