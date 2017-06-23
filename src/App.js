import React, { Component } from 'react';
import {TodoForm, TodoList} from './Components/Todo'
import './App.css';
import {addTodo,generateID} from './lib/TodoHelpers'

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const newID = generateID();
    const newTodo = {id:newID, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: ''
    })
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
          <TodoForm handleInputChange={this.handleInputChange}
                    currentTodo={this.state.currentTodo}
                    handleSubmit={this.handleSubmit}/>
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    )
  }
}

export default App;
