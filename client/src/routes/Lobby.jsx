/* eslint-disable react/prop-types */
export function Lobby({ handelClick, Label = 'lobby' }) {
  return (
    <>
      <h1>Lobby</h1>
      <button
        onClick={() => handelClick()}
        className=" bg-grey-200 dark:bg-slate-800 dark:text-white m-2 p-3 border-2 rounded-lg  hover:bg-gray-300 dark:hover:bg-slate-700 "
      >
        {Label}
      </button>
    </>
  );
}
