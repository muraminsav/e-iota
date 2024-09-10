import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextInputForm } from '../components/TextInputForm';

export function Home() {
  const [gameCode, setGameCode] = useState('');
  const [displayForm, setDisplayForm] = useState(false);
  //   const [message, setMessage] = useState();
  //   const URL = 'http://localhost:3000';
  //   useEffect(() => {
  //     fetch(URL, {
  //       method: 'GET',
  //       mode: 'cors',
  //     })
  //       .then((x) => x.json())
  //       .then((data) => setMessage(data.data))
  //       .then(() => console.log(message))
  //       .catch((e) => console.log(e));
  //   }, [null]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayForm(!displayForm);
    alert(gameCode);
  };

  return (
    <>
      {/* <h1>{message.name}</h1> */}
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
