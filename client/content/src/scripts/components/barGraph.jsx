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
      weekHistory: null,
      dayHistory: null,
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
      this.setState({ dayHistory: history });
    });

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
      this.setState({ weekHistory: history });
    });
  }

  componentDidMount() {
    if (this.props.history !== null) {
      const el = ReactDom.findDOMNode(this);
      d3BarGraph.destroy(el);
      d3BarGraph.create(el, this.props.history);
    }
    // const el = ReactDom.findDOMNode(this);
    // if (this.state.dayHistory !== null) {
    //   d3BarGraph.destroy(el);
    //   d3BarGraph.create(el, this.state.dayHistory);
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const el = ReactDom.findDOMNode(this);

    if (this.state.activeSelectedPeriod !== nextState.activeSelectedPeriod) {
      console.log('Bar Graph Component Updating...');
      console.log("this.state.activeSelectedPeriod: ", this.state);
      console.log("nextState.activeSelectedPeriod: ", nextState);
      if ((nextState.activeSelectedPeriod === 'All Time') && (this.props.history !== null)) {
        console.log('all history');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.props.history);
        return true;
      } else if ((nextState.activeSelectedPeriod === 'Past 7 Days') && (this.state.weekHistory !== null)) {
        console.log('Past 7 Days', nextState, this.state);
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.state.weekHistory);
        return true;
      } else if ((nextState.activeSelectedPeriod === 'Today') && (this.state.dayHistory !== null)) {
        console.log('Today');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.state.dayHistory);
        return true;
      }
      return true;
    } else if ((this.props.history === null) && (nextProps.history !== null)) {
      const el = ReactDom.findDOMNode(this);
      d3BarGraph.destroy(el);
      d3BarGraph.create(el, nextProps.history);
      return true;
    }

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
    chromeID: state.chromeID,
  };
};

export default connect(mapStateToProps)(Chart);
