import { createSlice } from "@reduxjs/toolkit";

//Estado inicial de la autenticacion
const initialState = {
  user: null,
  token: null,
};

//slice de redux encargado de gestionar la autenticacion
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //los valores del payloas son ingresados al estado de autenticacion
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    //resetea los valores de autenticacion
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

//Facilitan la obtencion de los datos
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
