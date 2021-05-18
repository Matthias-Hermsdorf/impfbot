const counteeApi = "https://countee-impfee.b-cdn.net/api/1.1/de/counters/getAll/_iz_sachsen?cached=impfee"
const checkData = require("./checkData")
const axios = require('axios');

module.exports = function () {
// Make a request for a user with a given ID
axios.get(counteeApi)
  .then(function (response) {
    // handle success

    if (response.data && response.data.response && response.data.response.data) {
      // console.log(response.data.response.data);
      let obj = response.data.response.data
      for (let index of Object.keys(obj)) {
        checkData.update(obj[index])
      }
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

}