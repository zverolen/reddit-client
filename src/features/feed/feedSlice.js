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
    tempDefaultFeed: (state) => {
      state.currentFeedName = 'Default Feed'
    },
    changeSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setCurrentNewsId: (state, action) => {
      state.currentNewsId = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
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


// 1. Fetch science subreddit and do everything with it. 
// 2. Implement other subreddits search
export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  //`/${subreddit}.json`
  const url = 'https://www.reddit.com/r/science.json';
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

export const { setSearchTerm, searchFeedNews, tempDefaultFeed, changeSubreddit, setCurrentNewsId, setCurrentView  } = feedSlice.actions;

export const selectHeading = (state) => state.feedSubreddit.currentFeedName;
export const selectCurrentFeedNewsIds = (state) => state.feedSubreddit.currentFeedNewsIds;
export const selectSearchTerm = (state) => state.feedSubreddit.searchTerm;
export const selectAllFeedsNames = (state) => state.feedSubreddit.allFeedsNames;
export const selectSubreddit = (state) => state.feedSubreddit.subreddit;
export const selectCurrentNewsId = (state) => state.feedSubreddit.currentNewsId;
//New
export const selectAllNews = (state) => state.feedSubreddit.news;
export const selectCurrentNews = (state, newsId) => state.feedSubreddit.news.find(news => news.id === newsId);
export const selectSearchedNews = (state, searchTerm) => state.feedSubreddit.news.filter(news => news.data.title.includes(searchTerm));
export const selectFeedStatus = (state) => state.feedSubreddit.status;
export const selectFeedView = (state) => state.feedSubreddit.currentView;

export default feedSlice.reducer;