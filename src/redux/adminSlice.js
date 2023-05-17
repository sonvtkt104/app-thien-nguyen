import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    campaigns: [],
    messages: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    reloadUsers: (state, action) => {
      state.users = action.payload;
    },
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    reloadCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    reloadMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  setUsers,
  reloadUsers,
  setCampaigns,
  reloadCampaigns,
  setMessages,
  reloadMessages,
} = adminSlice.actions;
export default adminSlice.reducer;
