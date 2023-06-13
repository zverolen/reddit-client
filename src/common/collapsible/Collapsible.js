import React, { useState } from "react";

import styles from './Collapsible.module.css';

// MEMO: default values because not all props are used in different cases
export function Collapsible({ children, buttonName, onAdditionalAction = null, additionalActionRequired = false }) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  // MEMO: Event handler
  // MEMO: Triggers rerender
  function handleClick(e) {
    setIsExpanded(!isExpanded);
    if (additionalActionRequired) {
      onAdditionalAction(e);
    }
  }

  const toggleButton = <button
                          type="button"
                          aria-controls="dropdown-content"
                          aria-expanded={isExpanded}
                          onClick={handleClick}
                        >
                          {buttonName}
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