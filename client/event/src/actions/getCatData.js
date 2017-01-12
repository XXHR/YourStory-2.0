'use strict';

import axios from 'axios';

function finalGetCatData (catData) {
  const data = {
    type: 'GET_CAT_DATA',
    payload: catData,
  };

  return data;
}

export default function getCatData() {
  return function (dispatch) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/catData',
    }).then((response) => {
      console.log("response from catdata: ", response);
      dispatch(finalGetCatData(response.data));
    });
  };
}
