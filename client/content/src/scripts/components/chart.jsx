'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import * as d3 from 'd3';
// import d3Chart from '../d3Chart';
const d3Chart = require('../d3Chart');

export default class Chart extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {
    const el = ReactDom.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px',
    }, this.state.data);
  }

  componentDidUpdate() {
    const el = ReactDom.findDOMNode(this);
    d3Chart.update(el, this.state.data);
  }

  componentWillUnmount() {
    const el = ReactDom.findDOMNode(this);
    d3Chart.destroy(el);
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}
