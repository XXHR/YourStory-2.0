import getChromeID from './actions/getChromeID';
import getTimeHistoryLastFetched from './actions/getTimeHistoryLastFetched';
import getHistoryByDate from './actions/getHistoryByDate';
import { postHistory } from './actions/postHistory';
import getCatData from './actions/getCatData';

export default {
  // the keys in this object are the names of the action to proxy,
  // the values are the action creators that get executed
  // when the proxied action is received in the background

  'get-chromeid': getChromeID,
  'get-time-history-last-fetched': getTimeHistoryLastFetched,
  'get-history-by-date': getHistoryByDate,
  'post-history': postHistory,
  'get-cat-data': getCatData,
};
