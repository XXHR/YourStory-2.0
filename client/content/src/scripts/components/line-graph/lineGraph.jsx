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
      startDate: null,
      daysAgo: 0,
      endDate: null,
      max: null,
      min: null,
      domains: [],
      selectedDomain1: '',
      selectedDomain2: '',
      selectedDomain3: '',
      selectedDomains: null,
    };

    this.baseState = this.state;
  }

  componentWillMount() {
    console.log('line graph historyByDate state: ', this.props.historyByDate);
  }

  componentDidUpdate(prevProps, prevState) {
      console.log('START DATE PROPS', this.state.startDate, 'DAYS AGO PROPS: ', this.state.daysAgo);
    // change to comparing objects (deep equality)
    // look into alternate deep equality method 
    if (JSON.stringify(prevProps.historyByDate) !== JSON.stringify(this.props.historyByDate)) {
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

  handleStartDateChange(e) {
    e.preventDefault();

    const date = e.target.value;

    const startDate = {
      day: parseInt(date.slice(8, 10), 10),
      month: parseInt(date.slice(5, 7), 10),
      year: parseInt(date.slice(0, 4), 10)
    }

    this.setState({ startDate })
  }

  handleDaysAgoChange(e) {
    e.preventDefault();
    this.setState({ daysAgo: parseInt(e.target.value, 10) });
  }  

  handleSubmit(e) {

    this.props.dispatch(getHistoryByDate(this.state));

  }

  handleDomainListChange(e) {

    let domainSelectId = e.target.id;
    
    if (domainSelectId === '1') {
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

     console.log('inside makeDataForXYAxis: ', data);

    let max = 0;
    let min = 0;
    let totalDomainCount = []

      // calculate month based on startDate day and month
      const endDate = {
        day: this.state.startDate.day - this.state.daysAgo,
        month: this.state.startDate.month,
        year: this.state.startDate.year
      }

      for (let domain in data) {
        for (let date of data[domain]) {
          totalDomainCount.push(date.count);
        }
      }

      max = Math.max(...totalDomainCount);
      min = Math.min(...totalDomainCount);

      this.setState({ endDate, max, min });
    // }

  }

  addMissingDates(domain) {
    console.log('INSIDE addMissingDates');

   let includedDates;

    for (let domainData in domain) {
      includedDates = domain[domainData].map((countDate) => {
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

  renderDomainLists() {
    if (this.state.domains.length > 0) {

    return <div className='graph-options'>
            <p> Pick up to 3 sites to view on the graph! </p>
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

      } else {
        return <div></div>
      }
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

  refresh() {
    this.setState(this.baseState);
  }

  render() {
    // const domainListData = [this.state.domains, this.state.domains, this.state.domains];
    return (
      <div className='lineGraph'>
        <div className='date-options'>
          <DateOptions
            handleStartDateChange={this.handleStartDateChange.bind(this)}
            handleDaysAgoChange={this.handleDaysAgoChange.bind(this)}

            startDateTest={this.state.startDateTest}
            daysAgoValue={this.state.daysAgo}
     
            handleSubmit={this.handleSubmit.bind(this)}
          />
        </div>

        <div className='refresh'>
          <button onClick={this.refresh.bind(this)}> Start Over! </button>
        </div>

        {this.renderDomainLists()}

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
