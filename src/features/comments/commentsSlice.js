import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  commentsStatus: 'idle'
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.commentsStatus = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus = 'success';
        state.data = action.payload[1];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus = 'failed';
        console.log(action.error.message);
      })
  }
});

export const fetchComments = createAsyncThunk('comments/fetchComments', async (permalink) => {  
  const url = `https://www.reddit.com${permalink}.json`;
  const response = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json()
    })
    .then((json) => {
      return json;
    });
    return response;
});

export const selectData = (state) => state.comments.data;
export const selectCommentsStatus = (state) => state.comments.commentsStatus;

export default commentsSlice.reducer;