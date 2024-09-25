import { usePlayerContext } from '../context/PlayerContext';
// eslint-disable-next-line react/prop-types
export function Toggle({ darkMode, setDarkMode }) {
  const { state, dispatch } = usePlayerContext();

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={state.darkMode}
          onChange={() => {
            setDarkMode(!darkMode);
            dispatch({ type: 'TOGGLE_DARK_MODE', payload: !darkMode });
          }}
        />
        <div className="relative w-11 h-6 bg-gray-400 rounded-full dark:peer-focus:ring-slate-500 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {state.darkMode ? 'Dark ' : 'Light '} mode
        </span>
      </label>
    </>
  );
}
