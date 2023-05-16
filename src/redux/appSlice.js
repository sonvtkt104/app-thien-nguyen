import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    name: "Son",
    id: "",
    token: "",
    username: "",
    openSubMenu: false,
    infoUser: {},
    userType: 'guest'  // guest || normal_user || charity || admin
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.name;
    },
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setOpenSubMenu: (state, action) => {
      state.openSubMenu = action.payload;
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    }
  },
});

export const { setName, setUserId, setToken, setUsername, setOpenSubMenu, setInfoUser, setUserType } =
  appSlice.actions;
export default appSlice.reducer;
