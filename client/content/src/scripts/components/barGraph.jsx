'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

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
    };
  }

  componentWillMount() {
    this.props.dispatch(postHistoryFromBackground(this.props.timeHistoryLastFetched));
  }

  componentDidMount() {
    if (this.props.history !== null) {
      const el = ReactDom.findDOMNode(this);
      d3BarGraph.destroy(el);
      d3BarGraph.create(el, this.props.history);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.timeHistoryLastFetched !== nextProps.timeHistoryLastFetched) {
      const el = ReactDom.findDOMNode(this);
      d3BarGraph.destroy(el);
      d3BarGraph.update(el, nextProps.history);
      return true;
    }
    return false;
  }

  handleTimePeriodClick(e) {
    console.log("handleTimePeriodClick e - ", e.target );
    
  }

  render() {
    return (
      <div>
        <div className="bar-graph-dropdown-conainer">
          <DropdownButton bsSize="small" bsStyle="link" title={this.state.selectedTimePeriod} id="bar-graph-dropdown">
            <MenuItem eventKey="1" className="bar-graph-dropdown-menuItem" onClick={this.handleTimePeriodClick.bind(this)}>All Time</MenuItem>
            <MenuItem eventKey="2" className="bar-graph-dropdown-menuItem" onClick={this.handleTimePeriodClick.bind(this)} active>Past 7 Days</MenuItem>
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
