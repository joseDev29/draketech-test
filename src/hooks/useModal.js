import { useContext, useEffect, useRef } from "react";
import { ToDosContext } from "../context/ToDosContext";
import { useForm } from "./useForm";

const initialForm = {
  title: "",
  text: "",
  category: "Others",
  important: false,
};

//Contiene todas las funciones utilizadas por el componente modal
export const useModal = () => {
  const { modal, resetModal, createToDo, updateToDo } =
    useContext(ToDosContext);

  const { form, onChange, resetForm, setForm } = useForm({
    ...initialForm,
  });

  const mainRef = useRef();
  const containerRef = useRef();

  //Reciber el evento del boton cancelar del modal y lo cierra
  const onClose = () => {
    mainRef.current.classList.add("modal--no-visible");
    containerRef.current.classList.add("modal--no-visible");

    setTimeout(() => {
      resetForm();
      resetModal();
    }, 450);
  };

  //Reciber el evento del boton crear del Modal
  const onCreateToDo = (ev) => {
    ev.preventDefault();

    const toDo = {
      ...form,
      createdAt: `${Date.now()}`,
    };

    createToDo(toDo);

    onClose();
  };

  //Recbe el evento del boton editar del modal
  const onUpdateToDo = (ev) => {
    ev.preventDefault();

    const toDo = {
      ...form,
      createdAt: `${Date.now()}`,
    };

    const id = modal.content.id;

    updateToDo(id, toDo);

    onClose();
  };

  //Verifica si en el estado del modal la porpiedad type existe,
  //en caso de existir carga en el formulario los datos del ToDo a actulizar
  //los cuales vienen en la propiedad content del estado del modal y que son enviados
  //desde el componente ToDoCard
  useEffect(() => {
    if (modal.type === "update") {
      setForm({
        title: modal.content.title,
        text: modal.content.text,
        category: modal.content.category,
        important: modal.content.important,
      });
    }
  }, [setForm, modal]);

  return {
    form,
    modal,
    mainRef,
    containerRef,
    onClose,
    onChange,
    onCreateToDo,
    onUpdateToDo,
  };
};
