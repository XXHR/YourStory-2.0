import React from 'react';
import { combineReducers } from 'redux';

import count from './count';
import chromeID from './chromeID';
import timeHistoryLastFetched from './timeHistoryLastFetched';
import historyByDate from './historyByDate';
import history from './history';
import catData from './catData';
import timecatDataLastFetched from './timecatDataLastFetched';

export default combineReducers({
  count,
  chromeID,
  timeHistoryLastFetched,
  timecatDataLastFetched,
  historyByDate,
  history,
  catData,
});
