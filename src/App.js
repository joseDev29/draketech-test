import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";

import { login, selectToken, selectUser } from "./context/authSlice";

import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { ToDos } from "./Pages/ToDos";

function App() {
  //Se obtiene el valor del token y user del estado de autenticacion de redux
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //Verifica si existen datos de autenticacion en localStorage
  //y hace un dispatch al estado de autenticacion de redux
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");

    if (localUser && localToken) {
      dispatch(login({ user: localUser, token: localToken }));
    }
  }, [dispatch]);

  const PublicRoutes = () => (
    <>
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </>
  );

  const PrivateRoutes = () => (
    <>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/to-dos" component={ToDos} />
        <Redirect to="/home" />
      </Switch>
      <Modal />
    </>
  );

  return (
    <>
      {token && user && <Navbar />}
      <div className="container vh-100">
        {/* Las rutas privadas solo podran ser ingresadas cuando existan datos de autenticacion en el estado de redux
          y el login no podra ser accedido hay una sesion iniciada
        */}
        <Switch>{!(token && user) ? PublicRoutes() : PrivateRoutes()}</Switch>
      </div>
    </>
  );
}

export default App;
