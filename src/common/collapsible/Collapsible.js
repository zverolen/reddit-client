import React, { useState } from "react";

import styles from './Collapsible.module.css';

export function Collapsible({ children }) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  const toggleButton = <button
                          type="button"
                          aria-controls="dropdown-content"
                          aria-expanded={isExpanded}
                          onClick={handleClick}
                        >
                          Subreddits
                        </button>;

  return (  
   <>
     <div data-test="toggle-feedsNav-heading" className={styles.heading}>
      <h2>{ toggleButton }</h2>  
    </div>
    <div data-test="dropdown" aria-live="polite">
      { isExpanded && children }
    </div>
   </>
  );
}