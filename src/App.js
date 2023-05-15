import React, { useState } from 'react';
import { Content } from './common/content/Content';
import { Search } from './common/search/Search';
import { tempDefaultFeed, fetchFeed } from './features/feed/feedSlice';
import './App.css';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [ searchTerm = '', setSearchTerm ] = useState();
  
  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchFeed('science'));
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function clearSearchTerm() {
    setSearchTerm('');
  }
 
  return (
    <div className='App'>
      <header className="header">
      <a data-test="link-home" onClick={handleClick} href='/'>Reddit Client</a>
        <Search onSearch={handleSearch} />
      </header>
      <main>
        <h1 className='visually-hidden'>Reddit Client App</h1>
         <Content term={searchTerm} onNavigation={clearSearchTerm} />
      </main>    
    </div>
  );
}

export default App;
