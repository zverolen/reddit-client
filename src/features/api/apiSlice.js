import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  // All of our requests will have URLs starting with 'https://www.reddit.com/r'
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/r' }),
  endpoints: builder => ({
    getSubreddit: builder.query({
      query: (subreddit) => `/${subreddit}.json`
      //Temp query for errors
      // query: () => '/пдзориллро'
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetSubredditQuery } = apiSlice;