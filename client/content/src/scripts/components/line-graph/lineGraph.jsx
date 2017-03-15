import React from 'react';
import { connect } from 'react-redux';
import DateOptions from './dateOptions';
import DomainList from './domainList';
import Graph from './graph';
import moment from 'moment';
import DateRange from '../../../../../../server/routeHandlers/helpers/createDateArray';


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
      console.log('line graph updated');
    // change to comparing objects (deep equality)
    // look into alternate deep equality method 
    if (JSON.stringify(prevProps.historyByDate) !== JSON.stringify(this.props.historyByDate)) {
      console.log('inside componentDidUpdate lineGraph');
      this.makeDomainList();
      this.makeDataForXYAxis();
    } 

    // if (prevState.selectedDomain1 !== this.state.selectedDomain1 || prevState.selectedDomain2 !== this.state.selectedDomain2 || prevState.selectedDomain3 !== this.state.selectedDomain3) {
    //   console.log('domain selected from dropdown');
    //   this.makeDataForDomainLines(selectedDomain);
    // }

    if (prevState.selectedDomain1 !== this.state.selectedDomain1) {
      console.log('change selectedDomain1');
      this.makeDataForDomainLines(this.state.selectedDomain1);
    }

     if (prevState.selectedDomain2 !== this.state.selectedDomain2) {
      console.log('change selectedDomain2');
      this.makeDataForDomainLines(this.state.selectedDomain2);
    }

     if (prevState.selectedDomain3 !== this.state.selectedDomain3) {
      console.log('change selectedDomain3');
      this.makeDataForDomainLines(this.state.selectedDomain3);
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

     console.log('inside makeDataForXYAxis');

    let max = 0;
    let min = 0;
    let totalDomainCount = []

      const startDate = {
        day: this.state.startDay,
        month: this.state.month,
        year: this.state.year
      };

      // calculate month based on startDate day and month
      const endDate = {
        day: this.state.startDay - this.state.endDay,
        month: this.state.month,
        year: this.state.year
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

  addMissingDates(domain) {
   console.log('DOMAIN IN addMissingDates: ', domain);

   let includedDates;

    for (let domainData in domain) {
      includedDates = domain[domainData].map((countDate) => {
        console.log('COUNT DATE INSIDE addMissingDates: ', countDate);
        return countDate.date.slice(0, 10);
      })
    }

    const dateArray = new DateRange(this.state.startDate.day, this.state.startDate.month, this.state.startDate.year, this.state.endDate.day).createDateArray();

    const missingDates = dateArray.filter((date) => {
      return !includedDates.includes(date);
    });

    const countZeroObjs = missingDates.map((date) => {
      return { count: 0, date };
    });

    for (let domainData in domain) {
      domain[domainData].push(countZeroObjs);
      
      domain[domainData] = domain[domainData].reduce((a, b) => {
        return a.concat(b);
      }, []).map((countDateObj) => {
        if (countDateObj.date.length > 11) {
          return { count: countDateObj.count, date: countDateObj.date.slice(0, 10) };
        } else {
          return countDateObj;
        }
      });

      domain[domainData].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })

    }


    return domain;

  }

  makeDataForDomainLines(selectedDomain) {

    // for any domain chosen from any dropdown menu, find associated data in historyByDate
    // push domain's object value into this.state.selectedDomains array
    let selectedDomains = [];

    for (let domain in this.props.historyByDate) {
        if (domain === selectedDomain) {
          let domainObj = {};
          domainObj[domain] = this.props.historyByDate[domain];

          selectedDomains.push(this.addMissingDates(domainObj));
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
