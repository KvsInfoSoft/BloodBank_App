import axios from 'axios';
const apiUrl = process.env.REACT_APP_Dev_Url;

export default class loginservice {
  async getUserLogin(param) {
    const myAPI = apiUrl + 'api/Login/UserLogin';
    let logindata = [];
    await axios
      .post(myAPI, param)
      .then((response) => {
        logindata = response;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log('server responded');
        } else if (error.request) {
          console.log('network error');
        } else {
          console.log(error);
        }
      });
    return Promise.resolve(logindata);
  }
}
