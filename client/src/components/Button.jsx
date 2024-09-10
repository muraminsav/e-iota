// eslint-disable-next-line react/prop-types
export function Button({ handelClick, label, disabled, charLimit }) {
  return (
    <>
      <button
        disabled={charLimit ? disabled : false}
        onClick={() => (handelClick ? handelClick() : null)}
        className=" bg-grey-200 dark:bg-slate-800 dark:text-white m-2 p-3 border-2 rounded-lg  hover:bg-gray-300 dark:hover:bg-slate-700 "
      >
        {label}
      </button>
    </>
  );
}
