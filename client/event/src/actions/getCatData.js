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

function getTimeHistoryLastFetched (time) {
  const data = {
    type: 'CATDATA_LAST_FETCHED',
    payload: time,
  };

  return data;
}

export default function getCatData() {
  // console.log("getting cat data");
  return function (dispatch) {    
    axios({
      method: 'get',
      url: `https://${HostPort}/api/catData`,
    }).then((response) => {
      // console.log("response: ", response.data);
      dispatch(finalGetCatData(response.data));
      const time = (new Date).getTime();
      // console.log("time from getCatData action: ");
      dispatch(getTimeHistoryLastFetched(time));
    });
  };
}
