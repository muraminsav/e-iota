/* eslint-disable react/prop-types */
import { Button } from './Button';
export function TextInputForm({
  label,
  handleSubmit,
  getValue,
  setValue,
  charLimit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {label}
        <input
          className="bg-gray-100 dark:bg-slate-800 dark:text-white; border-2 m-2 p-2 rounded-xl w-20"
          maxLength={charLimit ? charLimit : 10}
          type="text"
          value={getValue}
          onChange={(e) => setValue(e.target.value)}
          required={true}
        />
      </label>
      <Button
        label={'Go!'}
        disabled={getValue.length === charLimit ? false : true}
        charLimit={charLimit}
      />
      {/* <input
        type="submit"
        disabled={getValue.length === charLimit ? false : true}
        value={
          getValue.length === charLimit
            ? ' GO!'
            : ` ${charLimit - getValue.length}`
        }
      /> */}
    </form>
  );
}
