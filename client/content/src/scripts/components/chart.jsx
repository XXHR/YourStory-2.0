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
  constructor(props) {
    super(props);
    console.log('Chart props: ', props);
    this.state = {
      data: this.props.data,
    };
  }

  componentWillMount() {
    console.log("Chart componentWillMount", this.props.history);
    const domainNames = Object.keys(this.props.history);

    const historyDataFunc = () => {
      const historyData = [];
      domainNames.map((domain) => {
        return historyData.push({
          domain,
          visits: this.props.history[domain],
        });
      });

      return historyData;
    };

    const historyData = historyDataFunc();
    console.log("Chart.jsx domain names: ", historyData);
    this.setState({ data: historyData.slice(0, 50) });
  }

  componentDidMount() {
    const el = ReactDom.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px',
    }, this.state.data);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Chart componentWillReceiveProps nextProps: ", nextProps);
    if (this.props.history !== nextProps.history) {
      const el = ReactDom.findDOMNode(this);
      console.log('Chart componentWillReceiveProps props: ', this.state.data);
      d3Chart.destroy(el);
      d3Chart.update(el, this.state.data);
      return;
    }
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
