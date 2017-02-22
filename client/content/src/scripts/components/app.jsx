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
  componentWillMount() {
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
    return (
      <div>
        <h5>Chart</h5>
        <Chart />
      </div>
    );
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
    catData: state.catData,
  };
};

export default connect(mapStateToProps)(App);
