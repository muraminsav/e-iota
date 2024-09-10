import React, { useState } from 'react';
import { TextInputForm } from '../components/TextInputForm';
import { usePlayerContext } from '../context/PlayerContext';
export default function JoinGame() {
  const [playerName, setPlayerName] = useState('');
  const { state, dispatch } = usePlayerContext();
  return (
    <>
      <div>JoinGame </div>
      <h2> {' ' + playerName}</h2>
      <TextInputForm
        label={'playerName'}
        handleSubmit={() => {
          dispatch({ type: 'TOGGLE_IN_GAME' });
          console.log('all', state, localStorage.getItem('player'));
        }}
        getValue={playerName}
        setValue={setPlayerName}
      />
    </>
  );
}
