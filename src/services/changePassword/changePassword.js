import axios from 'axios';
const apiUrl = process.env.REACT_APP_Dev_Url;

export default class changePassword {
    async changePassword(param) {
      const myAPI = apiUrl + 'api/Login/ChangePassword';
      let data = [];
      await axios
        .post(myAPI, param)
        .then((response) => {
          data = response;
        })
        .catch((error) => {
          console.log(error.response);
        });
      return Promise.resolve(data);
    }
  }
  