import { useCallback } from 'react';
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';

import { useSounds } from '@/pages/Room/hooks';
import { Dispatch, select } from '@/store';

import './index.scss';

const HeaderContainer = () => {
  const { playSoundOn, playSoundOff } = useSounds();
  const { soundEnabled } = useSelector(select.room.state);
  const dispatch = useDispatch<Dispatch>();

  const handleExit = useCallback(() => {
    window.location.href = './';
  }, []);

  const toggleSound = useCallback(() => {
    dispatch.room.toggleSound();

    if (soundEnabled) {
      playSoundOff();
    } else {
      playSoundOn();
    }
  }, [dispatch, soundEnabled, playSoundOn, playSoundOff]);

  return (
    <Flex className="header-container" h="100%" p="4" align="center">
      <Heading fontSize={20} color="#fff">
        Picasso
      </Heading>
      <Spacer />

      <IconButton
        mr={3}
        aria-label="Sound"
        fontSize={20}
        icon={soundEnabled ? <HiOutlineSpeakerWave /> : <HiOutlineSpeakerXMark />}
        onClick={toggleSound}
      />
      <IconButton aria-label="Exit" fontSize={20} icon={<IoExitOutline />} onClick={handleExit} />
    </Flex>
  );
};

export default HeaderContainer;
