import React from 'react';
import { combineReducers } from 'redux';

import count from './count';
import chromeID from './chromeID';

export default combineReducers({
  count,
  chromeID,
});

