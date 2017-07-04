import React, { Component } from 'react';
import {TodoForm, TodoList} from './Components/Todo'
import './App.css';
import {addTodo,generateID,findById, toggleTodo, updateTodo} from './lib/TodoHelpers'

class App extends Component {
  state = {
    todos:[
      {id:1,name:'Learn JSX',isComplete:true},
      {id:2,name:'Build App',isComplete:false},
      {id:3,name:'Ship it',isComplete:false}
    ],
    currentTodo: ''
  }

  handleToggle = (id) => {
    const todo = findById(id,this.state.todos);
    const toggled = toggleTodo(todo);
    const updatedTodos = updateTodo(this.state.todos, toggled);
    this.setState({todos: updatedTodos});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newID = generateID();
    const newTodo = {id:newID, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleInputChange = (e) => {
    this.setState({
      currentTodo:e.target.value
    })
  }
  render(){
    const submitHandler = this.state.currentTodo? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>React Todos</h2>
        </div>
        <div className='Todo-App'>
        {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
                    currentTodo={this.state.currentTodo}
                    handleSubmit={submitHandler}/>
          <TodoList todos={this.state.todos} handleToggle={this.handleToggle}/>
        </div>
      </div>
    )
  }
}

export default App;
