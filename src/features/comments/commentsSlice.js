import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  commentsStatus: 'idle'
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {}
});

export const selectCommentsStatus = (state) => state.comments.commentsStatus;

export default commentsSlice.reducer;