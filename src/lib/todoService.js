const baseURL = 'http://localhost:8080/todos';

export const loadTodos = () => {
  return fetch(baseURL)
    .then(res => res.json());
}

export const createTodo = (todo) => {
  return fetch(baseURL,{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());

}

export const saveTodo = (todo) => {
  return fetch(`${baseURL}/${todo.id}`,{
    method: 'PUT',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());

}

export const destroyTodo = (id) => {
  return fetch(`${baseURL}/${id}`,{
    method: 'DELETE',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })

}
