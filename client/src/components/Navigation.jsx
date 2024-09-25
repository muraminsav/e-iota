import { Toggle } from './Toggle';
import { useNavigate } from 'react-router-dom';
import {usePlayerContext} from '../context/PlayerContext'

// eslint-disable-next-line react/prop-types
export default function Navigation({ darkMode, setDarkMode }) {
  const { state, dispatch } = usePlayerContext();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between">
      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        E-IOTA
      </h1>
      <div>
      <h2>{state.name}</h2>
      <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </nav>
  );
}
