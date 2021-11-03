import { useLogin } from "../../hooks/useLogin";
import "./styles.css";

export const LoginForm = () => {
  const { email, password, remember_me, onChange, onLogin } = useLogin();

  return (
    <form className="login-form__main" onSubmit={onLogin}>
      <h4 className="login-form__title">Sign In</h4>
      <div className="login-form__pair">
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          required={true}
        />
      </div>
      <div className="login-form__pair">
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange}
          required={true}
        />
      </div>
      <div className="login-form__pair-checkbox">
        <label htmlFor="">Remember me</label>
        <input
          type="checkbox"
          name="remember_me"
          id="remember_me"
          checked={remember_me}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="login-form__btn">
        Login
      </button>
    </form>
  );
};
