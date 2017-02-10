import React from 'react';
import { connect } from 'react-redux';

import History from './history';
import Categories from './catData';
import axios from 'axios';
import SplashLandingPage from './splashLandingpage';

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
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-11">
                  <h5>Most Visited Sites</h5>
                  <div className="data-parent-container">
                    <History />
                  </div>
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-11">
                  <h5>Sites By Category</h5>
                  <div className="data-parent-container">
                    <Categories />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>      
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                  <h5>Sites Visited This Week</h5>

                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>        
      );
    } else {
      return (
        <div>          
          <SplashLandingPage/>          
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  // console.log('Store from App.js: ', state);
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