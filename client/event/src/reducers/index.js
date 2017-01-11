import React from 'react';
import { combineReducers } from 'redux';

import count from './count';
import token from './token';

export default combineReducers({
  count,
  token,
});

