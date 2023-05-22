import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    campaigns: [],
    messages: [],
    listVerifies: [],
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
    setListVerifies: (state, action) => {
      state.listVerifies = action.payload;
    },
    reloadVerifies: (state, action) => {
      state.listVerifies = action.payload;
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
  setListVerifies,
  reloadVerifies,
} = adminSlice.actions;
export default adminSlice.reducer;
