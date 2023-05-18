import React from "react";
import { prepareSubredditHeading } from "../../util/util";
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddit, setOpenNewsId, setView } from "../../features/feed/feedSlice";

export function GoBackLink() {
  const dispatch = useDispatch();
  const subreddit = useSelector(selectSubreddit);
  
  function goBack(e) {
    e.preventDefault();
    dispatch(setView('subreddit'));
    dispatch(setOpenNewsId(null));
  }

  return (
    <a 
      data-test="go-back-link" 
      href="/"
      onClick={goBack}
      >
        Go back to {prepareSubredditHeading(subreddit)}
      </a>                     
  );
}