/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import Socket, { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { RoomState, VideoSrc } from '../types';
import useChat from './useChat';
import usePeer from './usePeer';

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

const useSocket = (
  roomId: string,
  roomState: RoomState,
  setVideoSrces: Dispatch<SetStateAction<VideoSrc[]>>,
  setLock: Dispatch<SetStateAction<boolean>>,
  setIsScreenShare: Dispatch<SetStateAction<boolean>>
) => {
  const socketRef = useRef<Socket.Socket<DefaultEventsMap, DefaultEventsMap>>();
  const { messages, sendMessageSocket, newChatMessageOn } = useChat();
  const {
    start,
    setSocket,
    peerConnectOn,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  } = usePeer(
    roomId,
    roomState,
    setVideoSrces,
    setLock,
    setIsScreenShare
  );

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    newChatMessageOn(socketRef.current);
    setSocket(socketRef.current);
    peerConnectOn();

    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: string, nickname: string) => {
    sendMessageSocket(socketRef.current, messageBody, nickname);
  };

  return {
    messages,
    sendMessage,
    start,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  };
};

export default useSocket;
