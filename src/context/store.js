import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

//Store de redux el cual contiene el reducer authStore que se encarga
//de la informacion de autenticacion
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
