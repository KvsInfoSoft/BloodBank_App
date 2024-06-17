import axios from 'axios';
const apiUrl = process.env.REACT_APP_Dev_Url;


export default class donorServices {
    async getDonorDetails(param) {
      const myAPI = apiUrl + 'api/DonorRecord/DonorRecordDetails';
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

    async getDonationType() {
      const myAPI = apiUrl + 'api/DonorRecord/GetDonationType';
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
  