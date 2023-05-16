import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  subreddit: 'science',
  news: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  currentNewsId: null,
  currentView: 'subreddit'
};

export const feedSlice = createSlice({
  name: 'feedSubreddit',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    changeSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setCurrentNewsId: (state, action) => {
      state.currentNewsId = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    search: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeed.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = 'success';
        state.news = action.payload.data.children;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message);
      })
  }
});

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (subreddit) => {  
  const url = `https://www.reddit.com/r/${subreddit}.json`;
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

export const { setSearchTerm, searchFeedNews, tempDefaultFeed, changeSubreddit, setCurrentNewsId, setCurrentView, search  } = feedSlice.actions;

export const selectHeading = (state) => state.feedSubreddit.currentFeedName;
export const selectCurrentFeedNewsIds = (state) => state.feedSubreddit.currentFeedNewsIds;
export const selectSearchTerm = (state) => state.feedSubreddit.searchTerm;
export const selectAllFeedsNames = (state) => state.feedSubreddit.allFeedsNames;
export const selectSubreddit = (state) => state.feedSubreddit.subreddit;
//New
export const selectAllNews = (state) => state.feedSubreddit.news;
export const selectCurrentNews = (state) => state.feedSubreddit.news.find(news => news.data.id === state.feedSubreddit.currentNewsId);
export const selectSearchedNews = (state) => state.feedSubreddit.news.filter(news => news.data.title.includes(state.feedSubreddit.searchTerm));
export const selectFeedStatus = (state) => state.feedSubreddit.status;
export const selectFeedView = (state) => state.feedSubreddit.currentView;

export default feedSlice.reducer;