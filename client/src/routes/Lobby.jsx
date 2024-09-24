import { useEffect } from 'react';
import { useState } from 'react';
import { listRooms } from '../api/fetchApi';
import ListItem from '../components/ListItem';

/* eslint-disable react/prop-types */
export function Lobby({ Label = 'lobby' }) {
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    listRooms(setRoomList);
  }, []);
  return (
    <>
      <h1>Lobby</h1>
      <ul>
        {roomList.map((item, key) => {
          console.log(item);
          return <ListItem key={key} item={item} />;
        })}
      </ul>
      <button
        onClick={() => console.log(roomList)}
        className=" bg-grey-200 dark:bg-slate-800 dark:text-white m-2 p-3 border-2 rounded-lg  hover:bg-gray-300 dark:hover:bg-slate-700 "
      >
        {Label}
      </button>
    </>
  );
}
