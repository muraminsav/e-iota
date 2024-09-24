import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextInputForm } from '../components/TextInputForm';

export function Home() {
  const [gameCode, setGameCode] = useState('');
  const [displayForm, setDisplayForm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayForm(!displayForm);
    navigate(`/${gameCode}`);
  };
  return (
    <>
      <div>
        <div
          className={`${
            displayForm ? 'block' : 'hidden'
          } border-2 flex justify-between  p-5`}
        >
          <TextInputForm
            handleSubmit={handleSubmit}
            charLimit={4}
            setValue={setGameCode}
            getValue={gameCode}
            label="Enter game code:"
          />
          <div
            className="cursor-pointer mr-3"
            onClick={() => {
              setDisplayForm(false);
              setGameCode('');
            }}
          >
            x
          </div>
        </div>
        <div className={!displayForm ? 'block' : 'hidden'}>
          <Button label="FindGame" handelClick={() => navigate('/lobby')} />
          <Button label="CreateGame" handelClick={() => navigate('/create')} />
        </div>
        <div className={!displayForm ? 'block' : 'hidden'}>
          <p
            className="cursor-pointer"
            onClick={() => setDisplayForm(!displayForm)}
          >
            Have my own code{' '}
          </p>
        </div>
      </div>
    </>
  );
}
