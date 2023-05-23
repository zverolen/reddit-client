import React from "react";
import { useDispatch } from "react-redux";
import { fetchFeed, setSubreddit, setView } from "../../features/feed/feedSlice";
import { Collapsible } from "../collapsible/Collapsible";

import styles from './Nav.module.css';

export function Nav({ size }) {
  const dispatch = useDispatch();
  
  function handleSubredditsNav(e) {
    e.preventDefault();
    dispatch(setView('subreddit'));
    dispatch(fetchFeed(e.target.dataset.endpoint));
    dispatch(setSubreddit(e.target.dataset.endpoint));
  }

  const navLinks = <nav>
                    <a data-endpoint="science" onClick={handleSubredditsNav} href="/science">Science</a>
                    <a data-endpoint="space" onClick={handleSubredditsNav} href="/space">Space</a>
                    <a data-endpoint="scifi" onClick={handleSubredditsNav} href="/scifi">Sci-Fi</a>
                  </nav>;

  return (
      <div data-test="nav" className={styles.container}>
        {size === 'small' 
          ? 
          <Collapsible buttonName="Subreddits">{ navLinks }</Collapsible>
          : 
          <>{ navLinks }</>
        }
      </div>
  );
}