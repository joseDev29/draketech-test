import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToDoCard } from "../../components/ToDoCard";
import { selectUser } from "../../context/authSlice";
import { ToDosContext } from "../../context/ToDosContext";

import "./styles.css";

export const ToDos = () => {
  const { modal, setModal, toDos, getToDos } = useContext(ToDosContext);

  //Obtiene el user del estado de autenticacion de redux
  const user = useSelector(selectUser);

  //Recibe el evento del boton Add ToDo
  const onAddToDo = () => {
    setModal({
      ...modal,
      visible: true,
    });
  };

  //Llama la lista de ToDos
  useEffect(() => {
    getToDos();
  }, [getToDos]);

  return (
    <div className="container fade-in">
      <div className="todos__subcontainer row d-flex flex-column">
        <h1 className="todos__title">My List</h1>
        <div className="todos__username d-flex justify-content-center">
          <span translate="no">{user}</span>
        </div>
        <span className="todos__add-btn" onClick={onAddToDo}>
          <span></span>
          <p>Add ToDo</p>
        </span>
        <div className="todos__color-guide d-flex">
          <div>
            <span className="bg-ctg-work"></span>
            <p>Work</p>
          </div>
          <div>
            <span className="bg-ctg-education"></span>
            <p>Education</p>
          </div>
          <div>
            <span className="bg-ctg-shopping"></span>
            <p>Shopping</p>
          </div>
          <div>
            <span className="bg-ctg-others"></span>
            <p>Others</p>
          </div>
        </div>
      </div>
      <div className="todos-list__main row d-flex flex-row flex-wrap mt-4 pb-5">
        {/* Ordena las ToDos por su fecha de creacion */}
        {toDos
          .sort((a, b) => {
            let dateA = Number(a.createdAt);
            let dateB = Number(b.createdAt);

            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;
            return 0;
          })
          .map((item) => (
            <ToDoCard key={item._id} data={item} />
          ))}
      </div>
    </div>
  );
};
