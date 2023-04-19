import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    name: "Son",
    token: "",
    username: "",
    openSubMenu: false,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.name;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setOpenSubMenu: (state, action) => {
      state.openSubMenu = action.payload;
    }
  },
});

export const { setName, setToken, setUsername, setOpenSubMenu } = appSlice.actions;
export default appSlice.reducer;
