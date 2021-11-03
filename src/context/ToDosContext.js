import { createContext, useState, useCallback } from "react";
import axios from "axios";

//TodosContext se encarga de la gestion del estado
//referente a la lsta de ToDos
export const ToDosContext = createContext();

//Endpoint del CRUD de las ToDos
const apiURL = `https://crudcrud.com/api/1540ee575716442f9c8877229762877a`;

//Estado inicial del state del componente modal
const initialModal = {
  visible: false,
  type: null,
  content: {
    id: null,
    title: "",
    text: "",
    category: "Others",
    important: false,
  },
};

export const ToDosProvider = ({ children }) => {
  //Alberga la lista de ToDos
  const [toDos, setToDos] = useState([]);

  //Gestiona el estado del modal
  const [modal, setModal] = useState({
    ...initialModal,
  });

  //Reemplaza los valores del estado modal por initialModal
  const resetModal = () => {
    setModal({
      ...initialModal,
    });
  };

  //Llama la lista de ToDos del endpoint
  const getToDos = useCallback(async () => {
    console.log("get");
    const res = await axios.get(`${apiURL}/to-dos`);
    const data = res.data;

    setToDos(data);
  }, []);

  //Crea una nueva ToDo y luego llama al metodo getToDos para actualizar la lista del state toDos
  const createToDo = async (toDo) => {
    console.log("create: ", toDo);
    await axios.post(`${apiURL}/to-dos`, toDo);
    getToDos();
  };

  //Actualiza una ToDo en base a su id y luego llama al metodo getToDos para actualizar la lista del state toDos
  const updateToDo = async (id, toDo) => {
    console.log("update: ", toDo);
    await axios.put(`${apiURL}/to-dos/${id}`, toDo);
    getToDos();
  };

  //Elimina una ToDo en base a su id y luego llama al metodo getToDos para actualizar la lista del state toDos
  const deleteToDo = async (id) => {
    console.log("delete: ", id);
    await axios.delete(`${apiURL}/to-dos/${id}`);
    getToDos();
  };

  return (
    <ToDosContext.Provider
      value={{
        toDos,
        modal,
        setModal,
        resetModal,
        getToDos,
        createToDo,
        updateToDo,
        deleteToDo,
      }}
    >
      {children}
    </ToDosContext.Provider>
  );
};
