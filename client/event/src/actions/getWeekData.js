'use strict';

import axios from 'axios';

function finalGetWeekData (chromeHistoryArray) {
  const data = {
    type: 'GET_WEEK_DATA',
    payload: chromeHistoryArray,
  };

  return data;
}

export default function getWeekData() {
  return function (dispatch) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/weekData',
    }).then((response) => {
      console.log("response from weekdata: ", response);
      dispatch(finalGetWeekData(response.data));
    });
  };
}
