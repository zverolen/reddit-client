import React, { useState, useLayoutEffect } from "react";
import { Nav } from "../nav/Nav";
import { Feed } from "../../features/feed/Feed";

import style from './Content.module.css';

export function Content() {
  const [ windowSize, setWindowSize ] = useState(null);

  // MEMO:
  useLayoutEffect(() => {
    findWindowWidth();

    window.addEventListener('resize', handleWindowResize);

    function handleWindowResize() {
      findWindowWidth();
    } 

    // MEMO: triggers rerender
    function findWindowWidth() {
      if (window.innerWidth <= 500 ) {
        setWindowSize('small');
      } else {
        setWindowSize('big');
      }
    }

    //TODO: Add and test clean up
  });
  
  return ( 
    <div data-test="global-content" className={style.content}>
      <Nav size={windowSize} />
      <Feed />
   </div>
  );
}