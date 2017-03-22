'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import moment from 'moment';
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
    console.log("props: ", this.props.chromeID);
    this.state = {
      chromeID: this.props.chromeID,
      selectedTimePeriod: 'All Time',
      sevenDaysAgoHistory: null,
      todayHistory: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(postHistoryFromBackground(this.props.timeHistoryLastFetched));
    //get week history and save to state
    //get day history and save to state
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
    if (this.props.timeHistoryLastFetched !== nextProps.timeHistoryLastFetched) {
      d3BarGraph.destroy(el);
      d3BarGraph.update(el, nextProps.history);
      return true;
    } else if (this.state.selectedTimePeriod !== nextState.selectedTimePeriod) {
      // console.log('component should update...');

      if (nextState.selectedTimePeriod === 'All Time') {
        // console.log('...for All Time');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.props.history);
      } else if (nextState.selectedTimePeriod === 'Past 7 Days') {
        // console.log('...for Past 7 Days');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.state.sevenDaysAgoHistory);
      } else if (nextState.selectedTimePeriod === 'Today') {
        // console.log('...for Today');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.state.todayHistory);
      }

      return true;
    }
    return false;
  }

  handleTimePeriodClick(e) {
    this.setState({ selectedTimePeriod: e.target.innerText });
    const today = new Date();
    const startDateWeek = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    let daysAgo = 10;
    if (e.target.innerText === 'Past 7 Days') {
      daysAgo = 7;
    } else if ( e.target.innerText === 'Today') {
      daysAgo = 1;
    }
    console.log("this.state.chromeID", this.state.chromeID, startDateWeek, daysAgo);

    axios({
      method: 'post',
      url: 'https://getyourstory.us/api/historyByDate',
      data: { dateRange: { startDate: startDateWeek, daysAgo }, chromeID: this.state.chromeID },
    }).then((response) => {
      console.log("historyByDate response -- ", response);
      this.setState({ sevenDaysAgoHistory: response.data });
    });
  }

  render() {
    return (
      <div>
        <div className="bar-graph-dropdown-conainer">
          <DropdownButton bsSize="small" bsStyle="link" title={this.state.selectedTimePeriod} id="bar-graph-dropdown">
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
