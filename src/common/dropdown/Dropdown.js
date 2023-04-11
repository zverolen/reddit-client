import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

import { selectAllFeedsNames } from "../../features/feed/feedSlice";
import { errorMessages } from "../../data/data";

import styles from './Dropdown.module.css';

// Inconsistent naming and possibility for further abstraction - postponed till more complete functionality

export function Dropdown() {
  const [ windowSize, setWindowSize ] = useState(null);
  const errorMessage = errorMessages.feedsNavError.slice();

  useLayoutEffect(() => {
    findWindowWidth();

    window.addEventListener('resize', handleWindowResize);

    function handleWindowResize() {
      findWindowWidth();
    } 

    function findWindowWidth() {
      if (window.innerWidth <= 500 ) {
        setWindowSize('small');
      } else {
        setWindowSize('big');
      }
    }
  });

  // Different components used depending on the size of the window to separate showing Collapsed 
  // and Expanded modes depending on the screen size and the user action (pressing the button).
  // Now the dynamic compnent manages it's own state of being collapsed or extended independently
  // of the screen size

  return (
      <div className={styles.container}>
        {windowSize === 'small' 
          ? 
          <DynamicDropdown content={errorMessage}/> 
          : 
          <StaticDropdown content={errorMessage}/>
        }
      </div>
  );
}

export function StaticDropdown({ content }) {
  return (
  <>
    <div data-test="toggle-feedsNav-heading" className={styles.heading}>
     <h2>Categories</h2>
     </div>
     <div>
       { <p data-test="error-feedsNav-message" id="dropdown-content">{ content }</p> }
     </div>
  </>
  );
}

export function DynamicDropdown({ content }) {
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
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </button>;

  return (  
   <>
     <div data-test="toggle-feedsNav-heading" className={styles.heading}>
      <h2>Choose Category</h2>
        { toggleButton }
      </div>
      <div aria-live="polite">
        { isExpanded && <p data-test="error-feedsNav-message" id="dropdown-content">{ content }</p> }
      </div>
   </>
  );
}

//OLD CODE FOR REFERENCE

// export function Dropdown() {
//   const [ toggleOpen, setToggleOpen ] = useState(false);
//   const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
//   const [ isSmall, setIsSmall ] = useState(false);
//   const feedsNavErrorRef = useRef(null);
//   const toggleButtonRef = useRef(null);
//   const errorMessage = errorMessages.feedsNavError.slice();
//   const allFeedsNames = useSelector(selectAllFeedsNames);
//   const breakpoint = 500;
//   let content;
//   const isSmallScreen = windowWidth <= breakpoint;


  // Set the window width for conditional rendering of the dropdown
//   useEffect(() => {
   
//     const handleWindowResize = () => {
//       setWindowWidth(window.innerWidth);
//       setIsSmall(windowWidth <= breakpoint);
     
//       setToggleOpen(windowWidth > breakpoint); 
//       if (windowWidth > breakpoint) {
//         setToggleOpen(true);
//       } else {
//         setToggleOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleWindowResize);

//     return () => {
//       window.removeEventListener('resize', handleWindowResize);
//     };

//   });

//   const toggleButton = <button
//                         ref={toggleButtonRef}
//                         type="button"
//                         onClick={handleToggle}
//                         aria-expanded={toggleOpen}
//                         aria-controls="toggle-feedsNav"
//                       >
//                         {toggleOpen ? 'Collapse' : 'Expand'}
//                       </button>;

//   if (allFeedsNames.length) {
//     content = <div id="toggle-feedsNav" data-test="toggle-feedsNav"><nav></nav></div>;
//   } else {
//     content = <div id="toggle-feedsNav" data-test="toggle-feedsNav">
//         <p 
//           ref={feedsNavErrorRef}
//           data-test="error-feedsNav-message"
//           className="error-message"
//           tabIndex="-1"
//           >
//             {errorMessage}
//           </p>
//     </div>;
//   } 

//   function handleToggle() {
//     setToggleOpen(!toggleOpen);
//     toggleOpen ? feedsNavErrorRef.current.focus() : toggleButtonRef.current.focus();
//   }

//   return (
//     <>
//       <div className={styles.toggleContainer}>
//         <div data-test="toggle-feedsNav-heading" className={styles.toggleHeading}>
//           <h2>Choose News Feed</h2>
//           {isSmall && toggleButton}  
//         </div>
//       {toggleOpen && content}
//       </div>
//     </>
//   );
// }