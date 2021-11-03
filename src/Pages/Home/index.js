import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";

import "./styles.css";

export const Home = () => {
  return (
    <div className="home__main d-flex flex-column justify-content-center align-items-center fade-in">
      <img src={Logo} alt="logo" />
      <Link to="/to-dos">Go to my ToDo list</Link>
    </div>
  );
};
