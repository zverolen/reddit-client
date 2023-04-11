import React from "react";
import { useSelector } from "react-redux";

import { selectHeading, selectCurrentFeedNewsIds } from "./feedSlice";
import { errorMessages } from "../../data/data";

export function Feed() {
  const heading = useSelector(selectHeading);
  const feedNewsIds = useSelector(selectCurrentFeedNewsIds);
  const errorMessageFeed = errorMessages.feedError.slice();
  const errorMessageSearch = errorMessages.searchError.slice();
  const error = heading.includes('Search results') ? errorMessageSearch : errorMessageFeed;
  let content;

  feedNewsIds.length ? content = <div></div> : content = <p data-test="error-feed-message">{error}</p>;
    
  return(
    <div aria-live="polite">
      <h2 data-test="feed-heading">{heading}</h2>
      {content}
    </div>
  );
}