import React, { Component } from 'react';
import {TodoForm, TodoList} from './Components/Todo'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:[
        {id:1,name:'Learn JSX',isComplete:true},
        {id:2,name:'Build App',isComplete:false},
        {id:3,name:'Ship it',isComplete:false}
      ],
      currentTodo: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e){
    this.setState({
      currentTodo:e.target.value
    })
  }
  render(){
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>React Todos</h2>
        </div>
        <div className='Todo-App'>
          <TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} />
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    )
  }
}

export default App;
