import axios from 'axios';

const url = 'api/v1/users/';

class TodosService {
  static signUp(userName, passWord) {
    return axios.post(url, {
      email: userName,
      password: passWord
    });
  }

  //Login User
  static login(userName, passWord) {
    try {
      return axios.post(`${url}login`,
      {
        email: userName,
        password: passWord
      }
    );
    } catch (error) {
      console.log(error)
      return error
    }
  }

  //Send Verification to back end
  static verify(email) {
    return axios.get(`${url}${email}/verify`);
  }

  //Check Verification of User
  static verified(email) {
    return axios.get(`${url}${email}/verified`);
  }
}

export default TodosService;