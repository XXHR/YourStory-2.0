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

const getTimeHistoryLastFetchedFromBackground = () => {
  console.log('inside get-time-history-last-fetched mock action');
  const data = {
    type: 'get-time-history-last-fetched',
  };

  return data;
};

const getWeekDataFromBackground = () => {
  console.log('inside get-week-data mock action');

  const data = {
    type: 'get-week-data',
  };

const postHistory = () => {
  const data = {
    type: 'post-history',
  };
  return data;
};

// ************** END MOCK ACTIONS ************************
// ********************************************************

class App extends React.Component {

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch(getCount());
      // this.props.dispatch(getChromeIDFromBackground());
      // this.props.dispatch(getWeekDataFromBackground());
      // this.props.dispatch(getTimeHistoryLastFetchedFromBackground());
    });

    if (this.props.chromeID === 'no chromeID') {
      console.log('chromeID should not exist in store: ', this.props.chromeID);
      this.props.dispatch(getChromeIDFromBackground());
      this.props.dispatch(getTimeHistoryLastFetchedFromBackground());
    } else {
      console.log('chromeID exists in props', this.props.chromeID);
      this.props.dispatch(getWeekDataFromBackground());
      this.props.dispatch(getTimeHistoryLastFetchedFromBackground());
      this.props.dispatch(postHistory());
  }

  render() {
    return (
      <div>
        <h1>Hello from App.js</h1>
        <div>Count: {this.props.count} </div>
        <div>ChromeID: {this.props.chromeID} </div>
        <div>Time History Last Fetched from Chrome: {this.props.timeHistoryLastFetched} </div>
        <div>VisData: {this.props.visData} </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('Store from App.js: ', state);
  return {
    count: state.count,
    chromeID: state.chromeID,
    timeHistoryLastFetched: state.timeHistoryLastFetched,
    weekData: state.weekData,
    visData: state.visData
  };
};

export default connect(mapStateToProps)(App);
