'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

import d3Chart from '../d3Chart';

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
    const el = ReactDom.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px',
    });

    if (this.props.history !== null) {
      // console.log("component did mount");
      const el = ReactDom.findDOMNode(this);
      d3Chart.destroy(el);
      d3Chart.update(el, this.props.history);
    }
  }

  shouldComponentUpdate(nextProps) {
    // console.log("Chart props - ", this.props, nextProps);
    // console.log("do props equal eachother in shouldComponentUpdate?", JSON.stringify(this.props.history) === JSON.stringify(nextProps.history))
    if (JSON.stringify(this.props.history) !== JSON.stringify(nextProps.history)) {
      // console.log("this.props", this.props.history);
      // console.log("nextProps", nextProps.history);
      const el = ReactDom.findDOMNode(this);
      d3Chart.destroy(el);
      d3Chart.update(el, nextProps.history);
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    const el = ReactDom.findDOMNode(this);
    d3Chart.destroy(el);
  }

  render() {
    return (
      <div className='Chart' />
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
