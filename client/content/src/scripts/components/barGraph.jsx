'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';

import d3BarGraph from '../d3BarGraph';

const postHistoryFromBackground = (time) => {
  const data = {
    type: 'post-history',
    time,
  };
  return data;
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chromeID: this.props.chromeID,
      activeSelectedPeriod: 'All Time',
      weekHistory: [],
      dayHistory: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(postHistoryFromBackground(this.props.timeHistoryLastFetched));

    const today = new Date();
    const startDateWeek = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    // if (this.state.activeSelectedPeriod === 'Past 7 Days') {
    //   daysAgo = 7;
    // } else if (this.state.activeSelectedPeriod === 'Today') {
    //   daysAgo = 1;
    // }

    axios({
      method: 'post',
      url: 'https://getyourstory.us/api/historyByDate',
      data: { dateRange: { startDate: startDateWeek, daysAgo: 7 }, chromeID: this.state.chromeID },
    }).then((response) => {
      const history = [];
      for (let key in response.data) {
        if (response.data[key].length === 1) {
          history.push({ domain: key, visits: response.data[key][0].count });
        } else {
          let historyItem = { domain: key, visits: 0 };
          for (let i = 0; i < response.data[key].length; i++) {
            historyItem.visits += response.data[key][i].count;
          }
          history.push(historyItem);
        }
      }
      // if (daysAgo === 7) {
        this.setState({ weekHistory: history });
      // } else if (daysAgo === 1) {
        // this.setState({ dayHistory: history });
      // }
    });   

    axios({
      method: 'post',
      url: 'https://getyourstory.us/api/historyByDate',
      data: { dateRange: { startDate: startDateWeek, daysAgo: 1 }, chromeID: this.state.chromeID },
    }).then((response) => {
      const history = [];
      for (let key in response.data) {
        if (response.data[key].length === 1) {
          history.push({ domain: key, visits: response.data[key][0].count });
        } else {
          let historyItem = { domain: key, visits: 0 };
          for (let i = 0; i < response.data[key].length; i++) {
            historyItem.visits += response.data[key][i].count;
          }
          history.push(historyItem);
        }
      }
      // if (daysAgo === 7) {
        // this.setState({ weekHistory: history });
      // } else if (daysAgo === 1) {
        this.setState({ dayHistory: history });
      // }
    });            
  }

  componentDidMount() {
    if (this.props.history !== null) {
      const el = ReactDom.findDOMNode(this);
      d3BarGraph.destroy(el);
      d3BarGraph.create(el, this.props.history);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("nextState: ", nextState);
    // console.log("nextProps: ", nextProps);

    const el = ReactDom.findDOMNode(this);
    // if (this.props.timeHistoryLastFetched !== nextProps.timeHistoryLastFetched) {
    //   d3BarGraph.destroy(el);
    //   d3BarGraph.update(el, nextProps.history);
    //   return true;
    // } 
    // else 
    // if (this.state.activeSelectedPeriod !== nextState.activeSelectedPeriod) {
    //   console.log('component should update...');
    //   console.log("this.state.activeSelectedPeriod: ", this.state);
    //   console.log("nextState.activeSelectedPeriod: ", nextState);
    //   // if (nextState.activeSelectedPeriod === 'All Time') {
    //   //   // console.log('...for All Time');
    //   //   d3BarGraph.destroy(el);
    //   //   d3BarGraph.update(el, this.props.history);
    //   //   return true;
    //   // } else if (nextState.activeSelectedPeriod === 'Past 7 Days' ) {
    //   //   console.log('...for Past 7 Days', nextState, this.state);
    //   //   d3BarGraph.destroy(el);
    //   //   d3BarGraph.update(el, this.state.weekHistory);
    //   //   return true;
    //   // } else if (nextState.activeSelectedPeriod === 'Today') {
    //   //   // console.log('...for Today');
    //   //   d3BarGraph.destroy(el);
    //   //   d3BarGraph.update(el, this.state.dayHistory);
    //   //   return true;
    //   // }
    //   return true;
    // } else 
    if (this.state.weekHistory !== nextState.weekHistory) {
      console.log('...for Past 7 Days');
      console.log("this.state dayHistory", this.state.dayHistory);
      console.log("Next dayHistory", nextState.dayHistory);
      d3BarGraph.destroy(el);
      d3BarGraph.update(el, this.props.history);
      d3BarGraph.update(el, nextState.weekHistory);
      d3BarGraph.update(el, nextState.dayHistory);
      return true;
    } 
    // else if (this.state.dayHistory !== nextState.dayHistory) {

    // }
    return false;
  }

  handleTimePeriodClick(e) {
    this.setState({ activeSelectedPeriod: e.target.innerText });    
  }

  render() {
    return (
      <div>
        <div className="bar-graph-dropdown-conainer">
          <DropdownButton bsSize="small" bsStyle="link" title={this.state.activeSelectedPeriod} id="bar-graph-dropdown">
            <MenuItem eventKey="1" className="bar-graph-dropdown-menuItem" onClick={this.handleTimePeriodClick.bind(this)}>All Time</MenuItem>
            <MenuItem eventKey="2" className="bar-graph-dropdown-menuItem" onClick={this.handleTimePeriodClick.bind(this)}>Past 7 Days</MenuItem>
            <MenuItem eventKey="3" className="bar-graph-dropdown-menuItem" onClick={this.handleTimePeriodClick.bind(this)}>Today</MenuItem>
          </DropdownButton>
        </div>
        <div className="chart" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.history,
    timeHistoryLastFetched: state.timeHistoryLastFetched,
  };
};

export default connect(mapStateToProps)(Chart);
