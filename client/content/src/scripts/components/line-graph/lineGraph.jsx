import React from 'react';
import { connect } from 'react-redux';
import DateOptions from './dateOptions';
import DomainList from './domainList';
import XYAxis from './xyAxis';


const getHistoryByDate = (dates) => {
  const data = {
    type: 'get-history-by-date',
    payload: dates
  };

  return data;
}

class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      domains: ['google.com', 'facebook.com', 'nordstrom.com', 'weather.com'],
    };

    console.log('STATE FROM GRAPH OPTIONS', this.state.domains)
  }

  render() {
    const domainListData = [this.state.domains, this.state.domains, this.state.domains];
    return (
      <div>
        <div className='date-options'>
          <DateOptions />
        </div>

        <div className='graph-options'>
          {domainListData.map((domainList) =>
            <DomainList list={domainList} />
          )}
        </div>

        <XYAxis />
      </div>
    );
  }
};


export default LineGraph;
