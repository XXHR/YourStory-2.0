import React from 'react';
import { connect } from 'react-redux';

import History from './history';
import Categories from './catData';
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
  constructor(props) {
    super(props);
    this.state = {
      chromeIDState: this.props.chromeID,
    };
  }

  componentWillMount() {
    console.log("App componentWillMount: ");
    this.props.dispatch(getChromeIDFromBackground());
    this.props.dispatch(postHistoryFromBackground());
    this.props.dispatch(getHistoryByDateFromBackground());
    this.props.dispatch(getTimeHistoryLastFetchedFromBackground());
    this.props.dispatch(getCatDataFromBackground());
    
  }

  componentWillReceiveProps(nextProps) {
    console.log("App componentWillReceiveProps nextProps: ", nextProps);
    if (this.props.chromeIDState !== nextProps.chromeID) {
      this.setState({ chromeIDState: nextProps.chromeID });
    }
    console.log("this.props.history", this.props.history);
  }

  render () {
    if (this.props.chromeID !== 'no chromeID' && this.props.history !== null) {
      return (
        <div>
          <h5>Chart</h5>
          <Chart data={this.props.history} />
        </div>
      );
    } else {
      return (
        <div>no chromeid</div>
      )
    }
  //   if (this.props.chromeID !== 'no chromeID') {
  //     return (
  //       <div>
  //         <div className="row">
  //           <div className="col-sm-1"></div>
  //           <div className="col-sm-5">
  //             <div className="row">
  //               <div className="col-sm-11">
  //                 <h5>Most Visited Sites</h5>
  //                 <div className="data-parent-container">
  //                   <History />
  //                 </div>
  //               </div>
  //               <div className="col-sm-1"></div>
  //             </div>
  //           </div>

  //           <div className="col-sm-5">
  //             <div className="row">
  //               <div className="col-sm-1"></div>
  //               <div className="col-sm-11">
  //                 <h5>Sites By Category</h5>
  //                 <div className="data-parent-container">
                  
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col-sm-1"></div>
  //         </div>      
  //         <div className="row">
  //           <div className="col-sm-12">
  //             <div className="row">
  //               <div className="col-sm-1"></div>
  //               <div className="col-sm-10">
  //                 <h5>Sites Visited This Week</h5>
  //               </div>
  //               <div className="col-sm-1"></div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="col-sm-12">
  //             <div className="row">
  //               <div className="col-sm-1"></div>
  //               <div className="col-sm-10">
  //                 <h5>Chart</h5>
  //                 <Chart data={this.state.data} />
  //               </div>
  //               <div className="col-sm-1"></div>
  //             </div>
  //           </div>
  //         </div>
  //         <br />
  //         <br />
          
  //         <center>
  //           <Footer />
  //         </center>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <SplashLandingPage />
  //       </div>
  //     )
  //   }
  }
}

const mapStateToProps = (state) => {
  return {
    chromeID: state.chromeID,
    timeHistoryLastFetched: state.timeHistoryLastFetched,
    historyByDate: state.historyByDate,
    history: state.history,
    catData: state.catData,
  };
};

export default connect(mapStateToProps)(App);
