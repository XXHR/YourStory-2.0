import axios from 'axios';

function loadChromeIDDataUponResponse (data) {
  return {
    type: 'GET_CHROMEID',
    payload: data,
  };
}

export default function getChromeID() {
  console.log('INSIDE getChromeID action');

  return (dispatch) => {

    chrome.identity.getAuthToken({
      interactive: true,
    }, (token) => {
      console.log('TOKEN', token);
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
            const chromeID = JSON.parse(response.config.data).chromeID;
            console.log('CHROME ID', chromeID);
            
            dispatch(loadChromeIDDataUponResponse(chromeID))
          })
          .catch((error) => {
            console.log(error);
          });
      };
      x.send();
    });

  };

};
