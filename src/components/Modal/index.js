import { createPortal } from "react-dom";

import { useModal } from "../../hooks/useModal";

import "./styles.css";

export const Modal = () => {
  const {
    mainRef,
    containerRef,
    form,
    modal,
    onChange,
    onClose,
    onCreateToDo,
    onUpdateToDo,
  } = useModal();

  //El modal se reutiliza para creacion y edicion de ToDos y el contenido cambia en base a
  //condiciones que analizan si el estado modal en su propiedad type es igual a vacio o a update

  const Modal = modal.visible ? (
    <div
      className="modal__main d-flex justify-content-center align-items-center"
      ref={mainRef}
    >
      <form
        className="modal__container d-flex flex-column"
        ref={containerRef}
        onSubmit={modal.type === "update" ? onUpdateToDo : onCreateToDo}
      >
        <h4 className={`${modal.type === "update" ? "cl-edit" : "cl-create"}`}>
          {modal.type === "update" ? "Edit ToDo" : "Create ToDo"}
        </h4>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          maxLength={50}
          required={true}
        />

        <textarea
          name="text"
          id="text"
          value={form.text}
          onChange={onChange}
          placeholder="Description"
          className="my-scroll"
        />

        <select
          name="category"
          id="category"
          value={form.category}
          onChange={onChange}
        >
          <option value="Others">Others</option>
          <option value="Work">Work</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
        </select>

        <div className="modal__checkbox">
          <input
            type="checkbox"
            name="important"
            id="important"
            checked={form.important}
            onChange={onChange}
          />
          <label htmlFor="">Important</label>
        </div>

        <div className="modal__btns">
          <button
            type="submit"
            className={`${modal.type === "update" ? "bg-edit" : "bg-create"} `}
          >
            {modal.type === "update" ? "Edit" : "Create"}
          </button>
          <button type="reset" className="modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : null;

  return createPortal(Modal, document.getElementById("modal"));
};
