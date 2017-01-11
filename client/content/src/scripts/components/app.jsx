import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

// the mock action
const sendTokenToBackground = (token) => {
  console.log("sending token", token);
  const data = {
    type: 'get-token',
    payload: token,
  };

  return data;
};

class App extends React.Component {

  componentDidMount() {
    console.log("props:", this.props);
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'user-clicked-alias',
      });
    });

    if (this.props.token === 'no token') {
      chrome.identity.getAuthToken({
        interactive: true,
      }, (token) => {
        console.log("token:", token);
        return this.props.dispatch(sendTokenToBackground(token));
      })
    } else {
      console.log("token exists in props", this.props.token);

      if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
      }
      const x = new XMLHttpRequest();
      x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + this.props.token);
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
            console.log("response: ", response);
          })
          .catch((error) => {
            console.log(error);
          });              
      };
      x.send();
    }

    // document.addEventListener('click', () => {
    //   this.props.dispatch({
    //     type: 'get-token',
    //   });
    // });    
  }

  render() {
    return (
      <div>
        <h1>Hello from App.js</h1>
        <div>count: {this.props.count} </div>
        <div>token: {this.props.token} </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("inside App.js: ", state);
  return {
    count: state.count,
    token: state.token,
  };
};

export default connect(mapStateToProps)(App);