import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CreateRoom } from './routes/CreateRoom';
import { GameRoom } from './routes/GameRoom';
import { Lobby } from './routes/Lobby';
import { Home } from './routes/Home';
import useDarkMode from './utility/useDarkMode';
import { PlayerProvider } from './context/PlayerContext';
import Navigation from './components/Navigation';

function App() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === 'light' ? true : false
  );
  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);
  return (
    <>
      <PlayerProvider>
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/:roomID" element={<GameRoom />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </PlayerProvider>
    </>
  );
}

export default App;
