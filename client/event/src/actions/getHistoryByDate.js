'use strict';

import axios from 'axios';

function finalGetHistoryByDate(historyByDateData) {
  const data = {
    type: 'GET_HISTORY_BY_DATE',
    payload: historyByDateData,
  };

  return data;
}

export default function getHistoryByDates(dates) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/historyByDate',
      data: { dateRange: dates }
    }).then((response) => {
      dispatch(finalGetHistoryByDate(response.data));
    });
  };
}
