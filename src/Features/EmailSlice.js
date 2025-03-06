import { createSlice } from "@reduxjs/toolkit";

const EmailSlice = createSlice({
  name: "EmailSlice",
  initialState: {
    unreadMessages: [],
    readMessages: [],
    favoriteMessages: [],
  },
  reducers: {
    readMessages: (state, action) => {},
  },
});
