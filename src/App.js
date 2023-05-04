import React from 'react';
import { Content } from './common/content/Content';
import { Search } from './common/search/Search';
import { tempDefaultFeed } from './features/feed/feedSlice';
import './App.css';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  
  function handleClick(e) {
    e.preventDefault();
    dispatch(tempDefaultFeed());
  }

  return (
    <div className='App'>
      <header className="header">
      <a data-test="link-home" onClick={handleClick} href='/'>Reddit Client</a>
        <Search />
      </header>
      <main>
        <h1 className='visually-hidden'>Reddit Client App</h1>
         <Content />
      </main>    
    </div>
  );
}

export default App;
