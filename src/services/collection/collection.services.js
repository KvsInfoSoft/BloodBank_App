import axios from 'axios';
const apiUrl = process.env.REACT_APP_Dev_Url;


export default class collectionServices {
    async getCollectionDetails(param) {
      const myAPI = apiUrl + 'api/CollectionRecord/GetCollectionRecord';
      let data = [];
      await axios
        .post(myAPI, param)
        .then((response) => {
          data = response;
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
      return Promise.resolve(data);
    }

    async getPayMode() {
      const myAPI = apiUrl + 'api/CollectionRecord/GetPayMode';
      let data = [];
      await axios
        .get(myAPI)
        .then((response) => {
          data = response;
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
      return Promise.resolve(data);
    }
  }

  
  