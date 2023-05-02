import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    name: "Son",
    id: "",
    token: "",
    username: "",
    openSubMenu: false,
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
  },
});

export const { setName, setUserId, setToken, setUsername, setOpenSubMenu } =
  appSlice.actions;
export default appSlice.reducer;
