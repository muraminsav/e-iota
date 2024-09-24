/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { usePlayerContext } from '../context/PlayerContext';
import { Button } from '../components/Button';
import { createRoom } from '../api/fetchApi';
import { useLocation } from 'react-router-dom';
export function CreateRoom({ label = 'CreateRoom' }) {
  // const { state, dispatch } = usePlayerContext();
  const [roomId, setRoomId] = useState();
  const [aa,cc]=useState("")

  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.text;
  useEffect(() => {
    createRoom(setRoomId);
  },[aa,cc]);
  return (
    <>
      <h1>Create Room</h1>
      <p>{message}</p>
      <h2>id:{roomId || 'waiting....'}</h2>
      <Button
        label={label}
        handelClick={() => roomId && navigate(`/${roomId}`)}
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
