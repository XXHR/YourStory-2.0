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
      min: null,
      domains: [],
    };
  }

  componentWillMount() {
    console.log('line graph historyByDate state: ', this.props.historyByDate);
  }

  componentDidUpdate(prevProps) {
    // change to comparing objects (deep equality)
    if (JSON.stringify(prevProps.historyByDate) !== JSON.stringify(this.props.historyByDate)) {
      console.log('data has come back for line graph', this.props.historyByDate);
      return this.makeDomainList();
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log('history by date state', nextProps.historyByDate);

  //   if (JSON.stringify(this.props.historyByDate) !== JSON.stringify(nextProps.historyByDate)) {
  //     console.log('state was updated');
  //     return true;
  //   } else if(this.state.) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


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

    console.log('inside handleSubmit');

    this.props.dispatch(getHistoryByDate(this.state));

  }

  makeDomainList() {
    let data = this.props.historyByDate;

    console.log('inside makeDomainList', this.props.historyByDate);

    let domains = Object.keys(this.props.historyByDate);
    this.setState({ domains });
  }

  makeDataForXYAxis() {
    let data = this.props.historyByDate;

  //   const dummyData = { 'google.com':
  //  [ { date: '2017-02-13T08:00:00.000Z', count: 1509 },
  //    { date: '2017-02-14T08:00:00.000Z', count: 1468 } ],
  // 'facebook.com':
  //  [ { date: '2017-02-13T08:00:00.000Z', count: 800 },
  //    { date: '2017-02-14T08:00:00.000Z', count: 801 } ],
  // 'github.com':
  //  [ { date: '2017-02-13T08:00:00.000Z', count: 714 },
  //    { date: '2017-02-14T08:00:00.000Z', count: 743 } ],
  // 'mail.google.com':
  //  [ { date: '2017-02-13T08:00:00.000Z', count: 672 },
  //    { date: '2017-02-14T08:00:00.000Z', count: 666 } ],
  // 'medium.com':
  //  [ { date: '2017-02-13T08:00:00.000Z', count: 12 },
  //    { date: '2017-02-14T08:00:00.000Z', count: 12 } ]
  //  }
   // }

    // console.log('history by date data', data);

    const startDate = {};
    const endDate = {};
    let max = 0;
    let min = 0;
    let totalDomainCount = [];

    // if (data !== 'no history by date data yet') {
      for (let domain in dummyData) {
        startDate.month = Number(dummyData[domain][0].date.slice(5, 7));
        startDate.day = Number(dummyData[domain][0].date.slice(8, 10));
        startDate.year = Number(dummyData[domain][0].date.slice(0, 4));
        
        endDate.month = Number(dummyData[domain][dummyData[domain].length - 1].date.slice(5, 7));
        endDate.day = Number(dummyData[domain][dummyData[domain].length - 1].date.slice(8, 10));
        endDate.year = Number(dummyData[domain][dummyData[domain].length - 1].date.slice(0, 4));

        break;
      }

      for (let domain in dummyData) {
        for (let date of dummyData[domain]) {
          totalDomainCount.push(date.count);
        }
      }

      max = Math.max(...totalDomainCount);
      min = Math.min(...totalDomainCount);

      this.setState({ startDate, endDate, max, min });
    // }

    console.log('line graph component state', this.state);

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

        <div className='graph-options'>
          <DomainList domains={this.state.domains} />
        </div>

        <Graph 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          max={this.state.max}
          min={this.state.min}
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
