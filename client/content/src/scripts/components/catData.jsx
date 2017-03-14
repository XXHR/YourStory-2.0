' use strict ';
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

// import * as d3 from 'd3';
import d3catData from '../d3catData';

const getCatDataFromBackground = () => {
  const data = {
    type: 'get-cat-data',
  };
  return data;
};

class Categories extends React.Component {
  componentWillMount() {
    this.props.dispatch(getCatDataFromBackground());
  }

  componentDidMount() {
    console.log("componentDidMount -- this.props.catData:", this.props.catData);
    if (this.props.catData !== 'no catData') {
      const el = ReactDom.findDOMNode(this);
      console.log("el from componentDidMount: ", el);
      d3catData.create(el, this.props.catData);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.catData === 'no catData' && nextProps.catData !== 'no catData') {
      // console.log("shouldComponentUpdate -- nextProps.catData", nextProps.catData);
      // console.log("shouldComponentUpdate -- this.props.timecatDataLastFetched", this.props.timecatDataLastFetched);
      const el = ReactDom.findDOMNode(this);
      d3catData.create(el, nextProps.catData);
      return true;
    }
    return false;
  }

  handleRefreshCatDataChart() {
    console.log("catData React Component handleRefreshCatDataChart --- ");
    const el = ReactDom.findDOMNode(this);
    d3catData.update();
  }

  render() {
    return (
      <div id="catDataChart">
        <div id="refreshCatDataChart" onClick={this.handleRefreshCatDataChart.bind(this)}>refresh</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    catData: state.catData,
    timecatDataLastFetched: state.timecatDataLastFetched,
  };
};

export default connect(mapStateToProps)(Categories);