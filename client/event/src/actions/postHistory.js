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
      console.log("History from Chrome API request - ", chromeHistoryArray);
      axios({
        method: 'post',
        url: `https://${HostPort}/api/history`,
        data: { history: chromeHistoryArray },
      }).then((response) => {
        console.log("response ---- ", response.data);
        const domainNames = Object.keys(response.data);
        const historyDataFunc = () => {
          const historyData = [];

          domainNames.map((domain) => {
            return historyData.push({
              domain,
              visits: response.data[domain],
            });
          });
          return historyData;
        };
        const allHistory = historyDataFunc().slice(0, 50);
        console.log("postHistory Action allHistory: ", allHistory);
        dispatch(finalHistory(allHistory));
        dispatch(finalGetTimeHistoryLastFetched(Date.now()));
      });
    });
  };
}
