import axios from 'axios';
import store from '../store';

export function finalHistory(data) {
  return {
    type: 'POST_HISTORY',
    payload: data,
  };
};

export function postHistory() {
  return function(dispatch) {
   chrome.history.search({
    'text': '', // Return every history item....
    'startTime': store.timeHistoryLastFetched, // need to subtract now from timeHistoryLastFetched 
    }, (chromeHistoryArray) => {
      console.log('CHROME HISTORY', chromeHistoryArray);
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/history',
        data: { history: chromeHistoryArray },
      }).then((response) => {
        dispatch(finalHistory(response.data));
      });
    });
  };
};

