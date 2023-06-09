import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subreddit: 'science',
  news: [],
  status: 'idle',
  searchTerm: '',
  openNewsId: null,
  view: 'subreddit'
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  //MEMO: "Event handlers" based on the event type, return new state
  reducers: {
    setOpenNewsId: (state, action) => {
      state.openNewsId = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    search: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    fakeLoadNews: (state, action) => {
      state.news = action.payload.data.children;
    },
    fakeSetStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  // LEGACY: was used for making requests to the Reddit json api.
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchFeed.pending, (state, action) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchFeed.fulfilled, (state, action) => {
  //       state.status = 'success';
  //       state.news = action.payload.data.children;
  //     })
  //     .addCase(fetchFeed.rejected, (state, action) => {
  //       state.status = 'failed';
  //       console.log(action.error.message);
  //     })
  // }
});

// LEGACY: was used for making requests to the Reddit json api.
// export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (subreddit) => {  
//   const url = `https://www.reddit.com/r/${subreddit}.json`;
//   const response = fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
//       return response.json()
//     })
//     .then((json) => {
//       return json;
//     });
//     return response;
// });

export const { setOpenNewsId, setView, search, setSubreddit, fakeLoadNews, fakeSetStatus  } = feedSlice.actions;

export const selectSubreddit = (state) => state.feed.subreddit;
export const selectAllNews = (state) => state.feed.news;
export const selectOpenNews = (state) => state.feed.news.find(news => news.data.id === state.feed.openNewsId);
export const selectSearchedNews = (state) => {
  return state.feed.news.filter(news => news.data.title.toLowerCase().includes(state.feed.searchTerm.toLowerCase()));
};
export const selectStatus = (state) => state.feed.status;
export const selectView = (state) => state.feed.view;
export const selectSearchTerm = (state) => state.feed.searchTerm;

export default feedSlice.reducer;