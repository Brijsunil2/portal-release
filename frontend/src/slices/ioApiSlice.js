import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ioApiSlice = createSlice({
  name: "forumReply",
  initialState,
  reducers: {
    postReplys: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { postReplys } = ioApiSlice.actions;
