const baseURL = 'http://localhost:8080/todos';

export const loadTodos = () => {
  return fetch(baseURL)
    .then(res => res.json());
}
