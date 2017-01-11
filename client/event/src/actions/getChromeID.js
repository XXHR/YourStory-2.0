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

      if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
      }

      const x = new XMLHttpRequest();
      x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
      x.onload = function () {
        const userInfo = JSON.parse(x.response);
        console.log('User info from chrome: ', userInfo);
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/users', // 'http://yourstory-app.herokuapp.com/api/history'
          data: { chromeID: userInfo.id, username: userInfo.name },
        })
          .then((response) => {
            console.log('response: ', response);
            const chromeID = JSON.parse(response.config.data).chromeID;
            dispatch(finalGetChromeID(chromeID));
          })
          .catch((error) => {
            console.log(error);
          });
      };
      x.send();
    });
  };
}
