import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";

import { login } from "../context/authSlice";
import { useForm } from "./useForm";

const initialState = {
  email: "",
  password: "",
  remember_me: false,
};

//Contiene las funciones necesarias para cambiar el estado de la aplicacion
export const useLogin = () => {
  //permite despachar una accion de redux
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    form: { email, password, remember_me },
    onChange,
  } = useForm(initialState);

  //Hace una peticion post con el correo y contraseña
  //y recibe como respuesta un token y el mismo correo enviado
  const onLogin = async (ev) => {
    ev.preventDefault();

    const res = await axios.post("https://mini-login.vercel.app/api/login", {
      email,
      password,
    });

    const data = res.data;

    //Si la peticion fue resuelta, despacha una accion de redux con los datos
    //de la respuesta y redirige a la ruta /to-dos
    if (data.ok) {
      dispatch(login(res.data));

      //En caso de que el usuario seleccionara la opcion remember me en el
      //formulario de login, los datos de autenticacion se guardan en localStorage
      //y al recargar o ingresar a la aplicacion se verifica si existen estos datos
      //en localStorage
      if (remember_me) {
        localStorage.setItem("user", data.user);
        localStorage.setItem("token", data.token);
      }

      history.push("/to-dos");
    }
  };

  return {
    email,
    password,
    remember_me,
    onChange,
    onLogin,
  };
};
