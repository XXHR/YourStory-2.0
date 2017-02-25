import React from 'react';
import { connect } from 'react-redux';
import DateOptions from './dateOptions';
import DomainList from './domainList';
import Graph from './graph';



const getHistoryByDate = (dates) => {
  const data = {
    blah: 'blah-blah',
    type: 'get-history-by-date',
    payload: dates,
  };

  return data;
};

class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDay: 0,
      endDay: 0,
      month: 0,
      year: 0,
      startDate: null,
      endDate: null,
      max: null,
      min: null
    };
  }

  handleStartDayChange(e) {
    e.preventDefault();
    this.setState({ startDay: parseInt(e.target.value, 10) });
  }

  handleEndDayChange(e) {
    e.preventDefault();
    this.setState({ endDay: parseInt(e.target.value, 10) });
  }  

  handleMonthChange(e) {
    e.preventDefault();
    this.setState({ month: parseInt(e.target.value, 10) });
  }

  handleYearChange(e) {
    e.preventDefault();
    this.setState({ year: parseInt(e.target.value, 10) });
  }


  handleSubmit(e) {

    this.props.dispatch(getHistoryByDate(this.state));

    console.log('historyByDate from submit', this.props.historyByDate);

    return this.makeDataForXYAxis();

  }

  makeDataForXYAxis() {
    let data = this.props.historyByDate;
    const startDate = {};
    const endDate = {};
    let max = 0;
    let min = 0;
    let totalDomainCount = [];

    if (data) {
      for (let domain in data) {
        startDate.month = Number(data[domain][0].date.slice(5, 7));
        startDate.day = Number(data[domain][0].date.slice(8, 10));
        startDate.year = Number(data[domain][0].date.slice(0, 4));
        
        endDate.month = Number(data[domain][data[domain].length - 1].date.slice(5, 7));
        endDate.day = Number(data[domain][data[domain].length - 1].date.slice(8, 10));
        endDate.year = Number(data[domain][data[domain].length - 1].date.slice(0, 4));


        break;
      }

      for (let domain in data) {
        for (let date of data[domain]) {
          totalDomainCount.push(date.count);
        }
      }

      max = Math.max(...totalDomainCount);
      min = Math.min(...totalDomainCount);

      this.setState({ startDate, endDate, max, min });
    }

  }


  render() {
    // const domainListData = [this.state.domains, this.state.domains, this.state.domains];
    return (
      <div>
        <div className='date-options'>
          <DateOptions
            handleStartDayChange={this.handleStartDayChange.bind(this)}
            handleEndDayChange={this.handleEndDayChange.bind(this)}
            handleMonthChange={this.handleMonthChange.bind(this)}
            handleYearChange={this.handleYearChange.bind(this)}

            startDayValue={this.state.startDay}
            endDayValue={this.state.endDay}
            monthValue={this.state.month}
            yearValue={this.state.year}
            handleSubmit={this.handleSubmit.bind(this)}
          />
        </div>

        {/*<div className='graph-options'>
          {domainListData.map((domainList) =>
            <DomainList list={domainList} />
          )}
        </div>*/}

        <Graph 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          max={this.state.max}
          min={this.state.min}
          data={this.props.historyByDate}
        />

        
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    historyByDate: state.historyByDate,
  };
};

export default connect(mapStateToProps)(LineGraph);
