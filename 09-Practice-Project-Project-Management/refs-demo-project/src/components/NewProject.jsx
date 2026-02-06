import { devtools } from "globals";
import Input from "./Input.jsx";
import { useRef } from "react";

export default function NewProject({ onAddNew }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    console.log(
      "Saving project...",
      title.current.value,
      description.current.value,
      dueDate.current.value,
    );
    onAddNew({
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
    });
  }
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950 cursor-pointer">
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 cursor-pointer"
          >
            Save
          </button>
        </li>
      </menu>
      <Input label={"Title"} ref={title}></Input>
      <Input label={"Description"} textarea ref={description}></Input>
      <Input type="date" label={"Due Date"} ref={dueDate}></Input>
    </div>
  );
}
