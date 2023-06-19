import React from 'react';
import { Content } from './common/content/Content';
import { Search } from './common/search/Search';
import { Footer } from './common/footer/Footer';
import './App.css';

function App() { 
  return (
    <div className='App'>
      <header className="header">
        <h1>Your Reddit Client App</h1>
        <Search />
      </header>
      <Content />
      <Footer />
    </div>
  );
}

export default App;
