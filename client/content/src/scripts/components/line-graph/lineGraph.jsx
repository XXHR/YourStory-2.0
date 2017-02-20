import React from 'react';
import { connect } from 'react-redux';
import DateOptions from './dateOptions';
import DomainList from './domainList';
import XYAxis from './xyAxis';


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
      dates: [],
    };
  }


  handleStartDayChange(e) {
    this.setState({ startDay: parseInt(e.target.value, 10) });
  }

  handleEndDayChange(e) {
    this.setState({ endDay: parseInt(e.target.value, 10) });
  }  

  handleMonthChange(e) {
    this.setState({ month: parseInt(e.target.value, 10) });
  }

  handleYearChange(e) {
    this.setState({ year: parseInt(e.target.value, 10) });
  }


  handleSubmit(e) {
    
    console.log('props from submit', this.props);

    this.props.dispatch(getHistoryByDate(this.state));

  }

  makeDatesForXYAxis() {
    let dates = [];
      for (let domain in this.state.historyByDate) {
        for (let domainDay of this.state.historyByDate[domain]) {
          dates.push(domainDay.date.slice(0, 10));
          this.setState({ dates });
        }
      }
    return dates;
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

        <XYAxis data={this.props.historyByDate} />
        
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
