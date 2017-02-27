'use strict';

import axios from 'axios';
import HostPort from './hostPort';

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
      url: `http://${HostPort}/api/catData`,
    }).then((response) => {
      dispatch(finalGetCatData(response.data));
    });
  };
}
