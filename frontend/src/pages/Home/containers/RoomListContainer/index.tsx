import { useState } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Stack } from '@chakra-ui/react';

import { ROOM_LIST } from '@/constants';

const RoomListContainer = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleEnter = () => {
    navigate(`/room/${ROOM_LIST[selectedIndex].name}`);
  };

  return (
    <>
      <ul>
        {ROOM_LIST.map(({ name }, index) => {
          const selected = selectedIndex === index;
          const className = `${selected ? 'active' : ''}`;
          return (
            <li key={name}>
              <button type="button" className={className} onClick={() => handleItemClick(index)}>
                <span className="name">{name}</span>
                {selected && <span className="icon">🔮</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <Stack spacing={5}>
        <Divider />
        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          variant="solid"
          rightIcon={<BsArrowRightCircleFill />}
          onClick={handleEnter}
        >
          시작하기
        </Button>
      </Stack>
    </>
  );
};

export default RoomListContainer;
