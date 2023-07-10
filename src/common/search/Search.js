import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { search, setView } from "../../features/feed/feedSlice";

import style from './Search.module.css';

export function Search() {
  const [ searchTerm = '', setSearchTerm ] = useState();
  const dispatch = useDispatch();
  const isDisabled = searchTerm === '';

  // MEMO: Event handler
  // MEMO: Triggers rerender (input with characters)
  function handleSearchInput(e) {
    setSearchTerm(e.target.value);
  }

  // MEMO: Event handler
  // MEMO: Triggers rerender (clears the input)
  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm !== '') {
      dispatch(search(searchTerm));
      dispatch(setView('search'));
      setSearchTerm('');
    }; 
  }

  return (
    <form onSubmit={handleSearch} className={style.search} role="search">
      <div>
        <label htmlFor="search-input">Search headlines:</label>
        <input 
          value={searchTerm} 
          id="search-input"
          type="search"
          onChange={handleSearchInput}
        />
      </div>
      <button data-test="search-button" disabled={isDisabled} >Search</button>
    </form>
  );
}
