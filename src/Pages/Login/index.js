import { LoginForm } from "../../components/LoginForm";

import "./styles.css";

export const Login = () => {
  return (
    <div className="login__main row h-100 align-items-center justify-content-center fade-in">
      <div className="login__container d-flex flex-column align-items-center">
        <h1 className="login__title" translate="no">
          ToDo
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};
