import { useState } from "react";

export const useForm = (initialState) => {
  //Gestiona el estado del formulario
  const [form, setForm] = useState(initialState);

  //Esta funcion debe ser aplicada a cada input del formulario
  //en el cual se utilice este hook
  const onChange = (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;

    setForm({
      ...form,
      [ev.target.name]: value,
    });
  };

  //Resetea los datos del formulario a los datos ingresados inicialmente
  const resetForm = () => {
    setForm(initialState);
  };

  return {
    form,
    onChange,
    resetForm,
    setForm,
  };
};
