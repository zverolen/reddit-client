import React, { useState, useLayoutEffect } from "react";
import { Nav } from "../nav/Nav";
import { Feed } from "../../features/feed/Feed";

export function Content( { term, onNavigation } ) {
  const [ windowSize, setWindowSize ] = useState(null);

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
  
  return ( 
    // I will remove the position switch: the Nav will always come first.
    <div data-test="global-content">
      {windowSize === 'small'
      ?
      <>
        <Nav size={windowSize} onNavigation={onNavigation} />
        <Feed term={term} />
      </>
      :
      <>
        <Feed  term={term} />
        <Nav size={windowSize} onNavigation={onNavigation} />
      </>
      }  
   </div>
  );
}