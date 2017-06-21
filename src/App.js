import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render(){
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>React Todos</h2>
        </div>

        <div className='Todo-App'>
          <form>
            <input type='text' />
          </form>
          <div className='Todo-List'>
            <ul>
              <li><input type='checkbox' /> Learn JSX </li>
              <li><input type='checkbox' /> Build App </li>
              <li><input type='checkbox' /> Ship it </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
