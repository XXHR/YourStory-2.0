import axios from 'axios';
import HostPort from './hostPort';

export function finalHistory(data) {
  return {
    type: 'POST_HISTORY',
    payload: data,
  };
}

export function finalGetTimeHistoryLastFetched(time) {
  return {
    type: 'Time_History_Last_Fetched',
    payload: time,
  };
}

export function postHistory(originalAction) {
  return function (dispatch) {
    chrome.history.search({
      'text': '',
      'startTime': originalAction.time,
    }, (chromeHistoryArray) => {
      console.log("chromeHistoryArray should be same: ", chromeHistoryArray);
      axios({
        method: 'post',
        url: `https://${HostPort}/api/history`,
        data: { history: chromeHistoryArray },
      }).then((response) => {
        console.log("post history action response ----- ", response);
        // const domainNames = Object.keys(nextProps.history);
        // const historyDataFunc = () => {
        //   const historyData = [];

        //   domainNames.map((domain) => {
        //     return historyData.push({
        //       domain,
        //       visits: nextProps.history[domain],
        //     });
        //   });
        //   return historyData;
        // };
        // const allHistory = historyDataFunc();
        dispatch(finalHistory(response.data));
        const dateX = Date.now();        
        dispatch(finalGetTimeHistoryLastFetched(dateX));
      });
    });
  };
}
