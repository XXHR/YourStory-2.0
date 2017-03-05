import axios from 'axios';
import store from '../store';
import HostPort from './hostPort';

export function finalHistory(data) {
  return {
    type: 'POST_HISTORY',
    payload: data,
  };
}

export function postHistory() {
  return function(dispatch) {
    chrome.history.search({
      'text': '', // Return every history item....
      'startTime': store.timeHistoryLastFetched, // need to subtract now from timeHistoryLastFetched 
    }, (chromeHistoryArray) => {
      axios({
        method: 'post',
        url: `${HostPort}/api/history`,
        data: { history: chromeHistoryArray },
      }).then((response) => {
        dispatch(finalHistory(response.data));
      });
    });
  };
}
