import { configureStore } from '@reduxjs/toolkit';
import feedReducer from '../features/feed/feedSlice';

export const store = configureStore({
  reducer: {
    feedSubreddit: feedReducer
  }
});
