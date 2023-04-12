import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFeedName: 'Default Feed',
  currentFeedNewsIds: [],
  searchTerm: '',
  allFeedsNames: [],
  error: null
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
    }
  }
});

export const { setSearchTerm, searchFeedNews, tempDefaultFeed  } = feedSlice.actions;

export const selectHeading = (state) => state.feed.currentFeedName;
export const selectCurrentFeedNewsIds = (state) => state.feed.currentFeedNewsIds;
export const selectSearchTerm = (state) => state.feed.searchTerm;
export const selectAllFeedsNames = (state) => state.feed.allFeedsNames;

export default feedSlice.reducer;