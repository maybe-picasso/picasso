import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, select } from 'store';

import socket, { setupBaseInfo } from 'modules/socket';
import event from 'modules/event';

const SocketContainer = ({ roomId }: { roomId: string }) => {
  const { userInfo } = useSelector(select.room.state);
  const dispatch = useDispatch<Dispatch>();

  const onGateIn = useCallback(
    ({ participants }) => {
      console.log('onGateIn', participants);
      dispatch.room.setSocketState(true);
      dispatch.room.updateParticipants(participants);
    },
    [dispatch]
  );

  const onJoinUser = useCallback(
    (data) => {
      console.log('onJoinUser', data);
      dispatch.room.updateParticipants(data.participants);
      event.emit('join', data);
    },
    [dispatch]
  );

  const onLeaveUser = useCallback(
    (data) => {
      console.log('onLeaveUser', data);
      dispatch.room.updateParticipants(data.participants);
      event.emit('leave', data);
    },
    [dispatch]
  );

  const onMessage = useCallback((message: { type: string }) => {
    console.log('onMessage', message);
    event.emit(message.type, message);
  }, []);

  const bindSocket = useCallback(() => {
    socket.emit('gate', roomId);
    socket.on('gate', onGateIn);
    socket.on('join', onJoinUser);
    socket.on('leave', onLeaveUser);
    socket.on('message', onMessage);
  }, [roomId, onGateIn, onJoinUser, onLeaveUser, onMessage]);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    const { userId } = userInfo;
    setupBaseInfo({ roomId, userId });
  }, [roomId, userInfo]);

  useEffect(() => {
    bindSocket();
  }, [bindSocket]);

  return null;
};

export default SocketContainer;
