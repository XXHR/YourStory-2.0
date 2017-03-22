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

  handleClick(first, second, third) {
    console.log("event", third.target);
  }

  render() {
    return (
      <div>
        <DropdownButton bsSize="small" bsStyle="link" title="change date" id="bar-graph-dropdown">
          <MenuItem eventKey="1" className="bar-graph-dropdown-menuItem">Dropdown link</MenuItem>
          <MenuItem eventKey="2" className="bar-graph-dropdown-menuItem">Dropdown link</MenuItem>
        </DropdownButton>
        <div className="Chart" onClick={this.handleClick.bind(this, 1, 3)} />
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
