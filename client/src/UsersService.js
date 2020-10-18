import axios from 'axios';

const url = 'api/v1/todos/';

class TodosService {
  //Get Todos
  static getTodos() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
          }))
        );  
      } catch (err) {
        reject(err);
      }
    });
  }

  //Create Todo
  static insertTodo(text) {
    return axios.post(url, {
      text
    });
  }

  //Delete Todo
  static deleteTodo(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default TodosService;