import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  selectSubreddit, 
  changeSubreddit, 
  selectAllNews,
  selectCurrentNews,
  selectSearchedNews,
  fetchFeed,
  selectFeedStatus,
  selectFeedView,
  setCurrentView,
  setCurrentNewsId
} from "./feedSlice";
import { prepareSubredditHeading } from "../../util/util";
import { FeedItem } from "../../common/feedItem/FeedItem";

import style from './Feed.module.css';

export function Feed( { term } ) {

  const currentSubreddit = useSelector(selectSubreddit);
  const dispatch = useDispatch();
  const status = useSelector(selectFeedStatus);
  const allNews = useSelector(selectAllNews);
  const view = useSelector(selectFeedView);
  const currentNews = useSelector(selectCurrentNews);
  const searchedNews = useSelector(selectSearchedNews);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFeed('science'));
    }
  }, [status, dispatch])

  let content;
  let heading;

  if (status === 'loading') {
    content = <p>loading</p>
  } else if (status === 'success') {
    heading = prepareSubredditHeading(currentSubreddit);
    if (view === 'subreddit') {
      content = allNews.map(news => <FeedItem key={news.data.id} data={news.data} />);
    } else if (view === 'singleNews') {
      content = <FeedItem key={currentNews.data.id} data={currentNews.data} />;
    } else if (view === 'search') {
      content = searchedNews.map(news => <FeedItem key={news.data.id} data={news.data} />);
    }
  }

  function handleReload(e) {
    e.preventDefault();
    dispatch(changeSubreddit(currentSubreddit));
  }

  function goBack(e) {
    e.preventDefault();
    dispatch(setCurrentView('subreddit'));
    dispatch(setCurrentNewsId(null));
  }
 
  // save children directly instead of data - refactoring
  // if (isLoading || isFetching) {
  //   content = <p>loading</p>
  // } else if (isSuccess) {
  //   console.log('allNews');
  //   console.log(allNews);
  //   if (term === '') {
  //     heading = prepareSubredditHeading(currentSubreddit);
  //     const feedItems = feed.data.children;
  //     content = feedItems.map((item, index) => {
  //       return <FeedItem key={item.data.id} data={item.data} />
  //     });
  //   } else {
  //     const filteredNews = feed.data.children.filter(item => item.data.title.includes(term));
  //     if (filteredNews.length) {
  //       heading = `Search results for the term "${term}":`;
  //       content = filteredNews.map((item, index) => {
  //         return <FeedItem key={item.data.id} data={item.data} />
  //       });
  //     } else {
  //       heading = `No results for your phrase "${term}".`;
  //       content = <p data-test="error">Try another phrase or <a data-test="support-link" href="mailto:??@??.??">contact the support</a></p>
  //     }
  //   }
  // } else if (isError) {
  //   console.log(error);
  //   content = <div data-test="error">
  //               <p>Subreddit was not loaded due to a system error. Try <a data-test="reload-link" href="/" onClick={handleReload}>reloading</a> or <a data-test="support-link" href="mailto:??@??.??">contact the support</a>.
  //               </p>
  //             </div>;
  // } 
  
  return(
    <div data-test="feed" aria-live="polite" className={style.feed}>
      <h2 data-test="feed-heading">{heading}</h2>
      <div data-test="content">{content}</div>
      {view === 'singleNews' && <a href="/" onClick={goBack}>Link Back</a>}
    </div>
  );
}