import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import {Router} from './Components/router'

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('root')
);
