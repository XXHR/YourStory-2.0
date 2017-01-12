import axios from 'axios';
import store from '../store';

const finalVisData = (visData) => {
  return {
    type: 'POST_HISTORY',
    payload: visData,
  };
};

export default function postHistory() {
  const tenMinutes = 1000 * 60 * 60 * 72;
  const tenMinutesAgo = (new Date).getTime() - tenMinutes;
  return function(dispatch) {
   chrome.history.search({
    'text': '', // Return every history item....
    'startTime': tenMinutesAgo //store.timeHistoryLastFetched, // need to subtract now from timeHistoryLastFetched 
    }, (chromeHistoryArray) => {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/history',
        data: { history: chromeHistoryArray },
      }).then((response) => {
        dispatch(finalVisData(response.data));
      });
    });
  };
};

