'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

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
      selectedTimePeriod: 'All Time',
      sevenDaysAgoHistory: null,
      todayHistory: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(postHistoryFromBackground(this.props.timeHistoryLastFetched));
    //get week history and save to state
    //get day history and save to state

    // axios({
    //   method: 'post',
    //   url: `${HostPort}/api/historyByDate`,
    //   data: { dateRange: { startDate: startDateWeek, daysAgo } }
    // }).then((response) => {
    //   this.setState({ startDate: reformattedDate, daysAgo, historyByDate: response.data });
    // })
  }

  componentDidMount() {
    if (this.props.history !== null) {
      const el = ReactDom.findDOMNode(this);
      d3BarGraph.destroy(el);
      d3BarGraph.create(el, this.props.history);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const el = ReactDom.findDOMNode(this);
    if (this.props.timeHistoryLastFetched !== nextProps.timeHistoryLastFetched) {
      d3BarGraph.destroy(el);
      d3BarGraph.update(el, nextProps.history);
      return true;
    } else if (this.state.selectedTimePeriod !== nextState.selectedTimePeriod) {
      console.log('component should update...');

      if (nextState.selectedTimePeriod === 'All Time') {
        console.log('...for All Time');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, );
      } else if (nextState.selectedTimePeriod === 'Past 7 Days') {
        console.log('...for Past 7 Days');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.state.sevenDaysAgoHistory);
      } else if (nextState.selectedTimePeriod === 'Today') {
        console.log('...for Today');
        d3BarGraph.destroy(el);
        d3BarGraph.update(el, this.state.todayHistory);
      }

      return true;
    }
    return false;
  }

  handleTimePeriodClick(e) {
    console.log('handleTimePeriodClick e - ', e.target.innerText);
    this.setState({ selectedTimePeriod: e.target.innerText });
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
