import React from 'react';
import {combineReducers} from 'redux';

import count from './count';
import hello from './hello'

export default combineReducers({
  count, hello
});

