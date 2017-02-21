'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import * as d3 from 'd3';
// import d3Chart from '../d3Chart';
const d3Chart = require('../d3Chart');

export default class Chart extends React.Component { 
  constructor(props) {
    super(props);
    console.log('props in Chart: ', props);
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
    console.log('Chart componentDidUpdate props: ', this.state.data);
    d3Chart.destroy(el);
    d3Chart.update(el, this.state.data);
  }

  componentWillUnmount() {
    console.log('Chart componentWillUnmount props: ');
    const el = ReactDom.findDOMNode(this);
    d3Chart.destroy(el);
  }

  changeDataSet(newData) {
    this.setState({
      data: newData,
    });
    console.log('Chart changeDataSet function after setting state', this.state.data);
  }

  render() {
    return (
      <div className='Chart' onClick={() => this.changeDataSet([['google.com', 18], ['youtube.com', 17], ['github.com', 16], ['linkedin.com', 15], ['google.com', 14], ['youtube.com', 13], ['github.com', 12], ['linkedin.com', 11], ['google.com', 10], ['youtube.com', 9], ['github.com', 8], ['linkedin.com', 7], ['google.com', 6], ['youtube.com', 5], ['github.com', 4], ['linkedin.com', 3]])}></div>
    );
  }
}
