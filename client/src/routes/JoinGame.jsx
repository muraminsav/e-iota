import { useState, useEffect } from 'react';
import { TextInputForm } from '../components/TextInputForm';
import { usePlayerContext } from '../context/PlayerContext';
import { socket } from '../api/socket';
import { useParams } from 'react-router-dom';
import { findRoom } from '../api/fetchApi';
import { useNavigate } from 'react-router-dom';

export default function JoinGame() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const { state, dispatch } = usePlayerContext();
  const id = useParams();
  useEffect(() => {
    findRoom(id.roomID).then((respond) => {
      console.log(respond, 'joinGame find respond');
      const message = { text: 'Room Id not found, create new room!' };
      respond
        ? dispatch({ type: 'UPDATE_ROOM_ID', payload: id.roomID })
        : navigate('/create', { state: message });
    });
  }, []);
  return (
    <>
      <div>JoinGame </div>
      <div>id: {socket.id}</div>
      <h2> {' ' + playerName}</h2>
      <TextInputForm
        label={'playerName'}
        handleSubmit={() => {
          dispatch({ type: 'UPDATE_SOCKET_ID', payload: socket.id });
          dispatch({ type: 'TOGGLE_IN_GAME' });
          dispatch({ type: 'UPDATE_PLAYER_NAME', payload: playerName });
          console.log('all', state, localStorage.getItem('player'));
          console.log(state.roomID);
          socket.emit('join-room', state.roomId);
        }}
        getValue={playerName}
        setValue={setPlayerName}
      />
    </>
  );
}
