import React from 'react';
import './App.scss';
import User from './user/User';
import Todo from './todo/Todo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User></User>
        <Todo></Todo>
      </header>
    </div>
  );
}

export default App;
