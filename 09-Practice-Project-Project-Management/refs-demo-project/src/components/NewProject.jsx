import Input from "./Input.jsx";
import { useRef } from "react";
import Modal from "./Modal.jsx";

export default function NewProject({ onAddNew, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const modalRef = useRef();
  function handleSave() {
    console.log(
      "Saving project...",
      title.current.value,
      description.current.value,
      dueDate.current.value,
    );
    if (
      !title.current.value ||
      !description.current.value ||
      !dueDate.current.value
    ) {
      modalRef.current.open();
      return;
    }
    onAddNew({
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
      tasks: [],
    });
  }
  return (
    <>
      <Modal buttonCaption={"Okay"} ref={modalRef}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950 cursor-pointer"
            >
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
    </>
  );
}
