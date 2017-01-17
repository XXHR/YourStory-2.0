import React from 'react';
import { connect } from 'react-redux';

import History from './history';
import Categories from './catData';


// ********************************************************
// *************** START MOCK ACTIONS *********************

const getCount = () => {
  const data = {
    type: 'user-clicked-alias',
  };
  return data;
};

const getChromeIDFromBackground = () => {
  const data = {
    type: 'get-chromeid',
  };

  return data;
};

const getTimeHistoryLastFetchedFromBackground = () => {
  const data = {
    type: 'get-time-history-last-fetched',
  };

  return data;
};

const getHistoryByDateFromBackground = () => {
  const data = {
    type: 'get-history-by-date',
  };

  return data;
};

const postHistoryFromBackground = () => {
  const data = {
    type: 'post-history',
  };
  return data;
};

const getCatDataFromBackground = () => {
  const data = {
    type: 'get-cat-data',
  };
  return data;
};

// ************** END MOCK ACTIONS ************************
// ********************************************************

class App extends React.Component {

  componentWillMount() {
    document.addEventListener('click', () => {
      this.props.dispatch(getCount());
      // this.props.dispatch(getChromeIDFromBackground());
      // this.props.dispatch(getWeekDataFromBackground());
      // this.props.dispatch(getTimeHistoryLastFetchedFromBackground());
    });

    if (this.props.chromeID === 'no chromeID') {
      console.log('chromeID should not exist in store: ', this.props.chromeID);
      this.props.dispatch(getChromeIDFromBackground());
    } else {
      console.log('chromeID exists in props', this.props.chromeID);
      this.props.dispatch(getHistoryByDateFromBackground());
      this.props.dispatch(getTimeHistoryLastFetchedFromBackground());
      this.props.dispatch(getCatDataFromBackground());
      this.props.dispatch(postHistoryFromBackground()); 
    }
  }

  render() {
    if (this.props.chromeID !== 'no chromeID') {
      return (
        <div>
          <History />
          <Categories />
          <h1>Hello from App.js</h1>
          <div>Count: {this.props.count} </div>
          <div>ChromeID: {this.props.chromeID} </div>
          <div>Time History Last Fetched from Chrome: {this.props.timeHistoryLastFetched} </div>
        </div>
      );
    } else {
      return (
        <div>YOUR ARE NOT AUTHORIZED TO VIEW THIS APP no chromeID</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log('Store from App.js: ', state);
  return {
    count: state.count,
    chromeID: state.chromeID,
    timeHistoryLastFetched: state.timeHistoryLastFetched,
    historyByDate: state.historyByDate,
    history: state.history,
    catData: state.catData,
  };
};

export default connect(mapStateToProps)(App);