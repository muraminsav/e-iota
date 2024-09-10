/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import JoinGame from './JoinGame';
import { usePlayerContext } from '../context/PlayerContext';

export function GameRoom({ handelClick, Label }) {
  const { state, dispatch } = usePlayerContext();

  const [socketId, setSocketId] = useState();
  // const [inGame, setInGame] = useState(false);
  const socket = io('http://localhost:3000');
  console.log(state);
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
      setSocketId(socket.id);
    });
  }, []);
  if (!state.inGame) {
    return <JoinGame />;
  } else
    return (
      <>
        <h1>GameRoom</h1>
        <h2>player {socketId}</h2>
        <button
          onClick={() => handelClick()}
          className=" bg-grey-200 dark:bg-slate-800 dark:text-white m-2 p-3 border-2 rounded-lg  hover:bg-gray-300 dark:hover:bg-slate-700 "
        >
          {Label}
        </button>
      </>
    );
}
