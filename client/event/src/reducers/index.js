import React from 'react';
import { combineReducers } from 'redux';

import count from './count';
import chromeID from './chromeID';
import timeHistoryLastFetched from './timeHistoryLastFetched';
import weekData from './weekData';
import postHistory from './postHistory';

export default combineReducers({
  count,
  chromeID,
  timeHistoryLastFetched,
  weekData,
  postHistory,
});

