import React from 'react';
import { connect } from 'react-redux';

// import axios from 'axios';

// **** START MOCK ACTIONS ****
const getCount = () => {
  const data = {
    type: 'user-clicked-alias',
  };
  return data;
};

const getChromeIDFromBackground = () => {
  console.log('getting token from background script from mock action: ', data)
  const data = {
    type: 'get-chromeid',
  };

  return data;
};

// const sendTokenToBackground = (token) => {
//   console.log('sending token to background script from mock action: ', token);
//   const data = {
//     type: 'get-token',
//     payload: token,
//   };

//   return data;
// };
// **** END MOCK ACTIONS ****


class App extends React.Component {

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch(getCount());
      this.props.dispatch(getChromeIDFromBackground());
    });

    if (this.props.chromeID === 'no token') {
      console.log('there should be no token from store: ', this.props.chromeID);
    } else {
      console.log('token exists in props', this.props.chromeID);
    }

    // // // **** Example mock action that sends token
    // // // from content script to background script ****
    //   chrome.identity.getAuthToken({
    //     interactive: true,
    //   }, (token) => {
    //     console.log('token:', token);
    //     return this.props.dispatch(sendTokenToBackground(token));
    //   });
  }

  render() {
    return (
      <div>
        <h1>Hello from App.js</h1>
        <div>Count: {this.props.count} </div>
        
        <div>ChromeID: {this.props.chromeID} </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('Store from App.js: ', state);
  return {
    count: state.count,
    token: state.token,
    chromeID: state.chromeID,
  };
};

export default connect(mapStateToProps)(App);