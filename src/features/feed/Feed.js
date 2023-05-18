import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  selectSubreddit, 
  selectAllNews,
  selectCurrentNews,
  selectSearchedNews,
  fetchFeed,
  selectFeedStatus,
  selectFeedView,
  selectSearchTerm,
  setCurrentView,
  setCurrentNewsId
} from "./feedSlice";
import { prepareSubredditHeading } from "../../util/util";
import { FeedItem } from "../../common/feedItem/FeedItem";

import style from './Feed.module.css';

export function Feed() {

  const dispatch = useDispatch();
  const status = useSelector(selectFeedStatus);
  const view = useSelector(selectFeedView);
  const currentSubreddit = useSelector(selectSubreddit);
  const allNews = useSelector(selectAllNews);
  const currentNews = useSelector(selectCurrentNews);
  const searchedNews = useSelector(selectSearchedNews);
  const searchTerm = useSelector(selectSearchTerm);

  let content;
  let heading;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFeed('science'));
    }
  }, [status, dispatch])

  if (status === 'loading') {
    content = <p>loading</p>

  } else if (status === 'success') {
    heading = prepareSubredditHeading(currentSubreddit);

    if (view === 'subreddit') {
      // heading = prepareSubredditHeading(currentSubreddit);
      content = allNews.map(news => <FeedItem key={news.data.id} data={news.data} />);

    } else if (view === 'singleNews') {
      // heading = prepareSubredditHeading(currentSubreddit);
      content = <FeedItem key={currentNews.data.id} data={currentNews.data} />;

    } else if (view === 'search') {
      if (searchedNews.length > 0) {
        heading = `Search results for the term "${searchTerm}":`;
        content = searchedNews.map(news => <FeedItem key={news.data.id} data={news.data} />);

      } else {
        heading = `No results for your phrase "${searchTerm}".`
        content = <p data-test="error">Try another phrase or <a data-test="support-link" href="mailto:??@??.??">contact the support</a></p>;
      }
    }

  } else if (status === 'failed') {
    heading = prepareSubredditHeading(currentSubreddit);
    content = <div data-test="error">
                <p>Subreddit was not loaded due to a system error. Try <a data-test="reload-link" href="/" onClick={reload}>reloading</a> or <a data-test="support-link" href="mailto:??@??.??">contact the support</a>.
               </p>
               </div>;
  }

  function goBack(e) {
    e.preventDefault();
    dispatch(setCurrentView('subreddit'));
    dispatch(setCurrentNewsId(null));
  }

  function reload(e) {
    e.preventDefault();
    dispatch(fetchFeed(currentSubreddit));
  }
  
  return(
    <div data-test="feed" aria-live="polite" className={style.feed}>
      <h2 data-test="feed-heading">{heading}</h2>
      {view === 'search' && <a 
                              data-test="go-back-link" 
                              href="/" 
                              onClick={goBack}>Go Back to {prepareSubredditHeading(currentSubreddit)}
                              </a>
                            }
      <div data-test="content">{content}</div>
      {view === 'singleNews' && <a 
                              data-test="go-back-link" 
                              href="/" 
                              onClick={goBack}>Go Back to {prepareSubredditHeading(currentSubreddit)}
                              </a>
                            }
    </div>
  );
}