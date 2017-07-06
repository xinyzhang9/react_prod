import React, { Component } from 'react';
import {TodoForm, TodoList, Footer} from './Components/Todo'
import './App.css';
import {addTodo,generateID,findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/TodoHelpers'
import {pipe,partial} from './lib/utils'
import {loadTodos,createTodo,saveTodo,destroyTodo} from './lib/todoService'

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
    destroyTodo(id)
      .then(()=>this.showTempMsg('Todo Removed'));
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById,toggleTodo);
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo,this.state.todos)
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({todos: updatedTodos});
    saveTodo(updated).then(()=>this.showTempMsg('Todo Updated'))
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
    createTodo(newTodo)
      .then(this.showTempMsg('Todo added'));
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

  showTempMsg = (msg) => {
    this.setState({message:msg});
    setTimeout(()=>this.setState({message:''}),2000);
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
        {this.state.message && <span className='success'>{this.state.message}</span>}
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
