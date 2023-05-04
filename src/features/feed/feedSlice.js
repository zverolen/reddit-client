import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFeedName: 'Default Feed',
  currentFeedNewsIds: [],
  allFeedsNames: [],
  searchTerm: '',
  status: 'idle',
  error: null,
  subreddit: 'science'
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    searchFeedNews: (state) => {
      state.currentFeedName = `Search results for '${state.searchTerm}'`;
      state.currentFeedNewsIds = [];
      state.searchTerm = '';
    }, 
    tempDefaultFeed: (state) => {
      state.currentFeedName = 'Default Feed'
    },
    changeSubreddit: (state, action) => {
      state.subreddit = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeed.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = 'failed';
      })
  }
});

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const url = 'https://www.reddit.com/r/popular.json';
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

export const { setSearchTerm, searchFeedNews, tempDefaultFeed, changeSubreddit  } = feedSlice.actions;

export const selectHeading = (state) => state.feed.currentFeedName;
export const selectCurrentFeedNewsIds = (state) => state.feed.currentFeedNewsIds;
export const selectSearchTerm = (state) => state.feed.searchTerm;
export const selectAllFeedsNames = (state) => state.feed.allFeedsNames;
export const selectFeedStatus = (state) => state.feed.status;
export const selectSubreddit = (state) => state.feed.subreddit;

export default feedSlice.reducer;