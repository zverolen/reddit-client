import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  selectSubreddit, 
  selectAllNews,
  selectOpenNews,
  selectSearchedNews,
  fetchFeed,
  selectStatus,
  selectView,
  selectSearchTerm
} from "./feedSlice";
import { FeedItem } from "../../common/feedItem/FeedItem";
import { GoBackLink } from "../../common/goBackLink/GoBackLink";
import { prepareSubredditHeading } from "../../util/util";


import style from './Feed.module.css';

export function Feed() {

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const view = useSelector(selectView);
  const subreddit = useSelector(selectSubreddit);
  const allNews = useSelector(selectAllNews);
  const openNews = useSelector(selectOpenNews);
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
    heading = prepareSubredditHeading(subreddit);
  
    if (view === 'subreddit') {
      console.log('How many times you render?');
      // console.log(allNews);
      content = allNews.map(news => <FeedItem key={news.data.id} data={news.data} />);

    } else if (view === 'singleNews') {
      content = <FeedItem key={openNews.data.id} data={openNews.data} />;

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
    heading = prepareSubredditHeading(subreddit);
    content = <div data-test="error">
                <p>Subreddit was not loaded due to a system error. Try <a data-test="reload-link" href="/" onClick={reload}>reloading</a> or <a data-test="support-link" href="mailto:??@??.??">contact the support</a>.
                </p>
               </div>;
  }

  function reload(e) {
    e.preventDefault();
    dispatch(fetchFeed(subreddit));
  }
  
  return(
    <div data-test="feed" aria-live="polite" className={style.feed}>
      <h2 data-test="feed-heading">{heading}</h2>
      {view === 'search' && <GoBackLink />}
      <div data-test="content">{content}</div>
    </div>
  );
}
