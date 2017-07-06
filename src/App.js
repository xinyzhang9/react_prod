import React, { Component } from 'react';
import {TodoForm, TodoList, Footer} from './Components/Todo'
import './App.css';
import {addTodo,generateID,findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/TodoHelpers'
import {pipe,partial} from './lib/utils'
import {loadTodos} from './lib/todoService'

class App extends Component {
  state = {
    todos:[],
    currentTodo: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount(){
    loadTodos().then(todos => this.setState({todos}));
  }

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos:updatedTodos});
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo,this.state.todos))
    const updatedTodos = getUpdatedTodos(id,this.state.todos);
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
    const displayTodos= filterTodos(this.state.todos, this.context.route)
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>React Todos</h2>
        </div>
        <div className='Todo-App'>
        {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}/>
          <TodoList
            todos={displayTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}/>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
