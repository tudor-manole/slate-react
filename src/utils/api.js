var axios = require('axios');

module.exports = {
  fetchDevices: function () {
    var encodedURI = window.encodeURI('http://localhost:8000/devices');

    return axios.get(encodedURI)
      .then(function (response) {
        // console.log(response.data);
        return response.data;
      });
  },
  updateDevice: function (newDevice) {
    return axios.put( window.encodeURI(`http://localhost:8000/devices/${newDevice.hostname}`),
    { hostname: newDevice.hostname, model: newDevice.model, serial: newDevice.serial, mgmtIP: newDevice.mgmtIP,
        vendor: newDevice.vendor, mrv: newDevice.mrv, rack: newDevice.rack, labmodule: newDevice.labmodule })
      .then(function (response) {
        return response.data;
      });

  }
};
