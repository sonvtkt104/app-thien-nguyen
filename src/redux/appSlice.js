import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    name: "Son",
    token: "",
    username: "",
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
  },
});

export const { setName, setToken, setUsername } = appSlice.actions;
export default appSlice.reducer;
