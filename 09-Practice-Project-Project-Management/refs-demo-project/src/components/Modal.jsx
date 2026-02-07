import Button from "./Button.jsx";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => dialog.current.showModal(),
    };
  });
  return createPortal(
    <dialog
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      ref={dialog}
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root"),
  );
}

export default forwardRef(Modal);
