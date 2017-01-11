'use strict';

import axios from 'axios';

const finalGetChromeID = (chromeID) => {
  console.log('inside GET_CHROMEID action');
  const data = {
    type: 'GET_CHROMEID',
    payload: chromeID,
  };

  return data;
};

export default function getChromeID() {
  return function (dispatch) {
    chrome.identity.getAuthToken({
      interactive: true,
    }, (token) => {
      console.log('token from getChromeID redux-thunk action:', token);
      dispatch(finalGetChromeID(token));
    });
  };
}
