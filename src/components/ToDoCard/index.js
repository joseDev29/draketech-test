import { useContext, useState } from "react";
import { ToDosContext } from "../../context/ToDosContext";

import "./styles.css";

export const ToDoCard = ({
  data: { _id, title, text, category, important },
}) => {
  const { deleteToDo, setModal } = useContext(ToDosContext);
  const [expand, setExpand] = useState(false);
  //El estado expand se encarga de gestionar si la ToDo card esta contraida o expandida
  //en base a esto se cambian los estilos del componente
  const onExpand = () => {
    expand ? setExpand(false) : setExpand(true);
  };

  //Recibe el evento del boton eliminar del componente
  const onDelete = () => {
    deleteToDo(_id);
  };

  //recibe el evento del boton editar del componente
  const onUpdate = () => {
    setModal({
      visible: true,
      type: "update",
      content: {
        id: _id,
        title,
        text,
        category,
        important,
      },
    });
  };

  return (
    <div
      className={`todo-item__main fade-in ${
        expand && "todo-item__main--expand"
      }`}
    >
      <div className="todo-item__card">
        <div
          className="todo-item__card-head"
          style={{
            borderTopColor: `var(--category-${category.toLowerCase()})`,
          }}
        >
          <span
            className={`expand-icon ${expand && "expand-icon--expand"}`}
            onClick={onExpand}
          ></span>
          <h5 className="todo-item__title">{title}</h5>
          <div className="todo-item__actions">
            <span className="edit-icon" onClick={onUpdate}></span>
            <span className="delete-icon" onClick={onDelete}></span>
          </div>
        </div>
        <p
          className={`todo-item__text ${
            expand && "todo-item__text--expand my-scroll"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
