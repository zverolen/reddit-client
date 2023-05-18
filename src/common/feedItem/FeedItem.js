import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";

import { selectFeedView, setCurrentNewsId, setCurrentView } from "../../features/feed/feedSlice";

export function FeedItem({ data }) {
  let content;
  const dispatch = useDispatch();
  const view = useSelector(selectFeedView);
  const isSubredditView = view === 'subreddit' || view === 'search';

  function handleOpenNews(e) {
    e.preventDefault();
    dispatch(setCurrentNewsId(data.id));
    dispatch(setCurrentView('singleNews'));
  }

  // OPPORTUNITY: extract concrete content type rendering into a component and leave the common, like Go Back link, etc.
  // Rough checks while I'm figuring out how to distinguish between the possible content
    if (data.post_hint === 'hosted:video') {
    content = <div>
                <video
                          style={{width: '100px'}}
                          controls
                          src={data.media.reddit_video.fallback_url}
                  ></video>
              </div>;

  } else if (data.post_hint === 'rich:video') {
    content = <div><a href={data.url}>Rich Video {data.url}</a></div>;

  } else if (data.post_hint === 'image') {
    // It's not clear what alt attribute should be used
    content = <div>
                <img 
                  style={{width: '100px'}}
                  src={data.url}
                  alt={`Illustration from a post ${data.title}`}
              />
              </div>;

  } else if (data.post_hint === 'link') {
    content = <div><a href={data.url}>{data.url}</a></div>;

  } else if (data.selftext) {
    content = <div><ReactMarkdown>{data.selftext}</ReactMarkdown></div>

  }

  return (
    <div key={data.id} data-subreddit={data.subreddit}>
      <p data-test="author">{data.author}</p>
      <h3>{data.title}</h3>
      {content}
      {isSubredditView && <a data-test="open-single-news" href="/" onClick={handleOpenNews}>See full news</a>}
      <hr/>
    </div>
  );
}