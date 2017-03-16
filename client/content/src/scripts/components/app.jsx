import React from 'react';
import { connect } from 'react-redux';

import History from './history';
import Categories from './catData';
import LineGraphParent from './line-graph/lineGraphParent';
import SplashLandingPage from './splashLandingpage';
import Footer from './footer';
import Chart from './chart';

// ********************************************************
// *************** START MOCK ACTIONS *********************

const getChromeIDFromBackground = () => {
  const data = {
    type: 'get-chromeid',
  };

  return data;
};

// const getTimeHistoryLastFetchedFromBackground = () => {
//   const data = {
//     type: 'get-time-history-last-fetched',
//   };

//   return data;
// };

// const getHistoryByDateFromBackground = () => {
//   const data = {
//     type: 'get-history-by-date',
//   };

//   return data;
// };

// ************** END MOCK ACTIONS ************************
// ********************************************************

class App extends React.Component {
  componentWillMount() {
    console.log('chrome id props', this.props.chromeID)
        //if chrome)ID does not exsists, dispatch getChromeID    
    if (this.props.chromeID === 'no chromeID') {
      this.props.dispatch(getChromeIDFromBackground());
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log("App componentWillReceiveProps this.props.chromeID: ", this.props.chromeID); 
    console.log("App componentWillReceiveProps nextProps: ", nextProps.chromeID);    

    //if chromeID changes,re-render
    if (this.props.chromeID !== nextProps.chromeID) {
      return true;
    }
    //else if chromeID does not change return false
    return false;
  }

  render () {
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
                  <Chart />
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
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                  <h5>Sites Visited This Week</h5>
                  <LineGraphParent />
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
          </div>
          <br />
          <br />
          
          <center>
            <Footer />
          </center>
        </div>
      );
    } else {
      return (
        <div>
          <SplashLandingPage />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    chromeID: state.chromeID,
  };
};

export default connect(mapStateToProps)(App);
