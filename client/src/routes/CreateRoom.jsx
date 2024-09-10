/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../context/PlayerContext';
import { Button } from '../components/Button';

export function CreateRoom({ label = 'CreateRoom' }) {
  const { state, dispatch } = usePlayerContext();

  const navigate = useNavigate();
  const createRoom = async () => {
    try {
      console.log('creating room');
      const response = await fetch('http://localhost:3000/create-room', {
        method: 'POST',
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE_ROOM_ID', payload: data.roomId });

      // Redirect to the new room
      // navigate(`/${data.roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };
  useEffect(() => {
    createRoom();
  }, []);
  return (
    <>
      <h1>Create Room</h1>
      <h2>id:{state.roomId || 'waiting....'}</h2>
      <Button
        label={label}
        handelClick={() => state.roomId && navigate(`/${state.roomId}`)}
      />
      {/* <button
        onClick={() => state.roomId && navigate(`/${state.roomId}`)}
        className=" bg-grey-200 dark:bg-slate-800 dark:text-white m-2 p-3 border-2 rounded-lg  hover:bg-gray-300 dark:hover:bg-slate-700 "
      >
        {label}
      </button> */}
    </>
  );
}
