'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

import d3Chart from '../d3Chart';

const postHistoryFromBackground = () => {
  const data = {
    type: 'post-history',
  };
  return data;
};

class Chart extends React.Component {
  componentWillMount() {
    this.props.dispatch(postHistoryFromBackground());
  }

  componentDidMount() {
    const el = ReactDom.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px',
    });
    console.log("el: ", el);
  }

  shouldComponentUpdate(nextProps) {
    console.log("Chart componentWillReceiveProps nextProps: ", nextProps);
    if (this.props.history !== nextProps.history) {      
      const domainNames = Object.keys(nextProps.history);
      const historyDataFunc = () => {
        const historyData = [];

        domainNames.map((domain) => {
          return historyData.push({
            domain,
            visits: nextProps.history[domain],
          });
        });
        return historyData;
      };
      const allHistory = historyDataFunc();
      // console.log('Chart componentWillReceiveProps props: ', allHistory);
      
      const el = ReactDom.findDOMNode(this);    
      d3Chart.destroy(el);
      d3Chart.update(el, allHistory.slice(0, 50));
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
  };
};

export default connect(mapStateToProps)(Chart);
