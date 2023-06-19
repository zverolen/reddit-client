import React from "react";
import { useDispatch } from "react-redux";
import { setSubreddit, setView } from "../../features/feed/feedSlice";
import { Collapsible } from "../collapsible/Collapsible";

import styles from './Nav.module.css';

export function Nav({ size }) {
  const dispatch = useDispatch();
  
  // MEMO: Event handler 
  function handleSubredditsNav(e) {
    e.preventDefault();
    dispatch(setView('subreddit'));
    // LEGACY: was used for making requests to the Reddit json api.
    // dispatch(fetchFeed(e.target.dataset.endpoint));
    dispatch(setSubreddit(e.target.dataset.endpoint));
  }

  const navLinks = <nav>
                    <a data-endpoint="science" onClick={handleSubredditsNav} href="/science">Science</a>
                    <a data-endpoint="space" onClick={handleSubredditsNav} href="/space">Space</a>
                    <a data-endpoint="scifi" onClick={handleSubredditsNav} href="/scifi">Sci-Fi</a>
                  </nav>;

  return (
      <aside data-test="nav" className={styles.container}>
        {size === 'small' 
          ? 
          //MEMO: Passing children as props so that Collapsible could wrap whatever content  
            <Collapsible 
              openActionName="Show subreddits" 
              closeActionName="Hide subreddits"
              additionalActionRequired={false}
            >
              <h2>Subreddits</h2>
              { navLinks }
            </Collapsible>
          : 
          <>
            <h2>Subreddits</h2>
            { navLinks }
          </>
        }
      </aside>
  );
}