import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchTerm, selectSearchTerm, searchFeedNews } from "../../features/feed/feedSlice";

import style from './Search.module.css';

export function Search() {
  const dispatch = useDispatch();
  const searchInputValue = useSelector(selectSearchTerm);
  const isDisabled = searchInputValue === '';

  function handleSearchInput(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchInputValue !== '') dispatch(searchFeedNews()); 
  }

  return (
    <form onSubmit={handleSearch} className={style.search}>
      <div>
        {/* <label htmlFor="search-input" className="visually-hidden">Search</label> */}
        <input 
          value={searchInputValue} 
          id="search-input" 
          placeholder="Search"
          onChange={handleSearchInput}
        />
      </div>
      <button disabled={isDisabled} type="Submit">Submit</button>
    </form>
  );
}