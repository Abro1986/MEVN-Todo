import axios from 'axios';

const url = 'api/v1/users/';

class TodosService {
  //Get Todos

  //Create Todo
  static signUp(userName, passWord) {
    return axios.post(url, {
      email: userName,
      password: passWord
    });
  }

  //Delete Todo
  static login(userName, passWord) {
    return axios.post(`${url}login`,
      {
        email: userName,
        password: passWord
      }
    );
  }
}

export default TodosService;