'use strict';

import axios from 'axios';
import HostPort from './hostPort';

function finalGetHistoryByDate(historyByDateData) {
  const data = {
    type: 'GET_HISTORY_BY_DATE',
    payload: historyByDateData,
  };

  return data;
}

export default function getHistoryByDate(dates, chromeID) {
  return function (dispatch) {
    // console.log('dates from line graph action', dates);
    axios({
      method: 'post',
      url: `${HostPort}/api/historyByDate`,
      data: { dateRange: dates }
    }).then((response) => {
      console.log("response history: ", response.data);
      dispatch(finalGetHistoryByDate(response.data));
    });
  };
}
