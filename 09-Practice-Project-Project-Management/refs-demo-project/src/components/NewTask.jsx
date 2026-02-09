import { useRef } from "react";

export default function NewTask({ onAdd }) {
  const inputRef = useRef();

  function handleClick() {
    if (inputRef.current.value.trim() === "") {
      return;
    }
    onAdd(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        ref={inputRef}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
