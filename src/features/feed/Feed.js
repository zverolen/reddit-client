import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectSubreddit, changeSubreddit } from "./feedSlice";
import { useGetSubredditQuery } from "../api/apiSlice";
import { prepareSubredditHeading } from "../../util/util";
import { FeedItem } from "../../common/feedItem/FeedItem";

export function Feed() {

  const currentSubreddit = useSelector(selectSubreddit);
  const dispatch = useDispatch();

  const {
    data: feed,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error
  } = useGetSubredditQuery(currentSubreddit);

  let content;
  const heading = prepareSubredditHeading(currentSubreddit);

  function handleReload(e) {
    e.preventDefault();
    dispatch(changeSubreddit(currentSubreddit));
  }
  
  if (isLoading || isFetching) {
    content = <p>loading</p>
  } else if (isSuccess) {
    const feedItems = feed.data.children; 
    content = feedItems.map((item, index) => {
      return <FeedItem key={item.data.id} data={item.data} />
    });
  } else if (isError) {
    console.log(error);
    content = <div data-test="error">
                <p>Subreddit was not loaded due to a system error. Try <a data-test="reload-link" href="/" onClick={handleReload}>reloading</a> or <a data-test="support-link" href="mailto:??@??.??">contact the support</a>.
                </p>
              </div>;
  }
    
  return(
    <div data-test="feed" aria-live="polite">
      <h2 data-test="feed-heading">{heading}</h2>
      <div data-test="content">{content}</div>
    </div>
  );
}