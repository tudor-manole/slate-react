var axios = require('axios');

module.exports = {
  fetchDevices: function () {
    var encodedURI = window.encodeURI('http://localhost:8000/devices');

    return axios.get(encodedURI)
      .then(function (response) {
        // console.log(response.data);
        return response.data;
      });
  }
};
