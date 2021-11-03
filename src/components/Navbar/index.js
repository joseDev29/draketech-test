import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../context/authSlice";

import "./styles.css";

export const Navbar = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div className="navbar__main w-100 d-flex justify-content-between align-items-center">
      <div className="navbar__links d-flex">
        <Link to="/home">
          <span className="logo"></span> Home
        </Link>
        <Link to="/to-dos">To Dos</Link>
      </div>
      <button className="navbar__btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};
