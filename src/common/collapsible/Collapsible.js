import React, { useState } from "react";

import styles from './Collapsible.module.css';

// MEMO: default values because not all props are used in different cases
export function Collapsible({ 
  children, 
  openActionName,
  closeActionName, 
  onAdditionalAction = null, 
  additionalActionRequired = false
}) {
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ isCollapsed, setIsCollapsed ] = useState(true);

  // MEMO: Event handler
  // MEMO: Triggers rerender
  function handleClick(e) {
    setIsCollapsed(!isCollapsed);
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
                          {isCollapsed ? openActionName : closeActionName}
                        </button>;

  return (  
   <>
     <div data-test="toggle-feedsNav-heading" className={styles.heading}>
      { toggleButton }  
    </div>
    <div data-test="dropdown" aria-live="polite">
      { !isCollapsed && children }
    </div>
   </>
  );
}