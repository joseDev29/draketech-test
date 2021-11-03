import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap-4-grid/css/grid.min.css";
import "./index.css";

import App from "./App";
import { store } from "./context/store";
import { ToDosProvider } from "./context/ToDosContext";

//Se envuelve la App en el Provider de Redux, el Provider del ToDosContext y el BrowserRouter
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ToDosProvider>
        <App />
      </ToDosProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
