import React from 'react';
import { connect } from 'react-redux';
import DateOptions from './dateOptions';
import DomainList from './domainList';
import Graph from './graph';



const getHistoryByDate = (dates) => {
  const data = {
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
      selectedDomain1: '',
      selectedDomain2: '',
      selectedDomain3: '',
      selectedDomains: null,
      // selectValue1: '',
      // selectValue2: '',
      // selectValue3: '',
    };
  }

  componentWillMount() {
    console.log('line graph historyByDate state: ', this.props.historyByDate);
  }

  componentDidUpdate(prevProps, prevState) {
      // console.log('line graph updated', this.state);
    // change to comparing objects (deep equality)
    // look into alternate deep equality method 
    if (JSON.stringify(prevProps.historyByDate) !== JSON.stringify(this.props.historyByDate)) {
      this.makeDomainList();
      this.makeDataForXYAxis();
    } 

    if (prevState.selectedDomain1 !== this.state.selectedDomain1 || prevState.selectedDomain2 !== this.state.selectedDomain2 || prevState.selectedDomain3 !== this.state.selectedDomain3) {
      console.log('domain selected from dropdown');
      this.makeDataForDomainLines();
    }
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

    console.log('inside handleSubmit');

    this.props.dispatch(getHistoryByDate(this.state));

  }

  handleDomainListChange(e) {

    let domainSelectId = e.target.id;
    
    if (domainSelectId === '1') {
      console.log('first select used');
      // this.setState({ selectValue1: e.target.value })
      this.setState({ selectedDomain1: e.target.value });
    } else if (domainSelectId === '2') {
      // this.setState({ selectValue2: e.target.value })
      this.setState({ selectedDomain2: e.target.value });
    } else {
      // this.setState({ selectValue3: e.target.value })
      this.setState({ selectedDomain3: e.target.value });
    }
  }

  makeDomainList() {
    let data = this.props.historyByDate;

    let domains = Object.keys(this.props.historyByDate);
    this.setState({ domains });
  }

  makeDataForXYAxis() {
    let data = this.props.historyByDate;

    // console.log('history by date data', data);

    const startDate = {};
    const endDate = {};
    let max = 0;
    let min = 0;
    let totalDomainCount = [];

    // if (data !== 'no history by date data yet') {
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
    // }

  }

  makeDataForDomainLines() {
    // for any domain chosen from any dropdown menu, find associated data in historyByDate
    // push domain's object value into this.state.selectedDomains array
    let selectedDomains = [];

    for (let domain in this.props.historyByDate) {
      if (domain === this.state.selectedDomain1 || domain === this.state.selectedDomain2 || domain === this.state.selectedDomain3) {
        let domainObj = {};
        domainObj[domain] = this.props.historyByDate[domain];
        selectedDomains.push(domainObj);
      }
    }

    this.setState({ selectedDomains });

  }

  renderGraph() {
    if (this.state.startDate && this.state.endDate && this.state.max && this.state.min) {

      return <Graph 
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        max={this.state.max}
        min={this.state.min}
        selectedDomains={this.state.selectedDomains}
      /> 
    } else {
      return <div></div>
    }
  }


  render() {
    // const domainListData = [this.state.domains, this.state.domains, this.state.domains];
    return (
      <div className='lineGraph'>
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
          <DomainList
            id={1}
            domains={this.state.domains}
            handleChange={this.handleDomainListChange.bind(this)}
            selectValue={this.state.selectedDomain1}
          />
          <DomainList
            id={2}
            domains={this.state.domains}
            handleChange={this.handleDomainListChange.bind(this)}
            selectValue={this.state.selectedDomain2}
          />
          <DomainList
            id={3}
            domains={this.state.domains}
            handleChange={this.handleDomainListChange.bind(this)}
            selectValue={this.state.selectedDomain3}
          />
        </div>

        {this.renderGraph()}

        
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
