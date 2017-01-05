import React from 'react';
import { connect } from 'react-redux';

// ********************************************************
// *************** START MOCK ACTIONS *********************

const getCount = () => {
  const data = {
    type: 'user-clicked-alias',
  };
  return data;
};

const getChromeIDFromBackground = () => {
  console.log('getting chromeID from background script from mock action: ', data)
  const data = {
    type: 'get-chromeid',
  };

  return data;
};

// ************** END MOCK ACTIONS ************************
// ********************************************************

class App extends React.Component {

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch(getCount());
      this.props.dispatch(getChromeIDFromBackground());
    });

    if (this.props.chromeID === 'no chromeID') {
      console.log('there should be no chromeID from store: ', this.props.chromeID);
    } else {
      console.log('chromeID exists in props', this.props.chromeID);
    }

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
    chromeID: state.chromeID,
  };
};

export default connect(mapStateToProps)(App);