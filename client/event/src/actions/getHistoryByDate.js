'use strict';

import axios from 'axios';

function finalGetHistoryByDate(data) {
  const data = {
    type: 'GET_HISTORY_BY_DATE',
    payload: data,
  };

  return data;
}

export default function getHistoryByDates(dates) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/historyByDate',
      data: dates
    }).then((response) => {
      dispatch(finalGetHistoryByDate(response.data));
    });
  };
}
