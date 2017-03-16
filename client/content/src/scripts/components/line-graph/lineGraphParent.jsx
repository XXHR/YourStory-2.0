import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import DateOptions from './dateOptions';
import DomainList from './domainList';
import Graph from './graph';
import moment from 'moment';
import DateRange from '../../../../../../server/routeHandlers/helpers/createDateArray';
import HostPort from '../../../../../event/src/actions/hostPort';
import axios from 'axios';

class LineGraphParent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: '',
      daysAgo: '',
      endDate: null,
      historyByDate: '',
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
    // make axios call to retrieve data from a week ago (default)
    console.log('line graph historyByDate state: ', this.state.historyByDate);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('LINE GRAPH CURRENT STATE: ', this.state);

    if (this.state.historyByDate !== '' && JSON.stringify(prevState.historyByDate) !== JSON.stringify(this.state.historyByDate)) {
      console.log('new data coming in line graph')
      this.makeDomainList();
      this.makeDataForXYAxis();
    }

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

    this.setState({ startDate: e.target.value })
  }

  handleDaysAgoChange(e) {
    e.preventDefault();
    this.setState({ daysAgo: parseInt(e.target.value, 10) });
  }  

  handleSubmit(e) {

    // this.props.dispatch(getHistoryByDate(this.state));
    e.preventDefault();

    const date = this.state.startDate;

    const startDate = {
      day: parseInt(date.slice(8, 10), 10),
      month: parseInt(date.slice(5, 7), 10),
      year: parseInt(date.slice(0, 4), 10)
    }

    axios({
      method: 'post',
      url: `${HostPort}/api/historyByDate`,
      data: { dateRange: { startDate, daysAgo: this.state.daysAgo } },
    }).then((response) => {
      console.log('response getHistoryByDate: ', response.data);
      this.setState({ historyByDate: response.data });
    });

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
    let data = this.state.historyByDate;

    let domains = Object.keys(this.state.historyByDate);
    this.setState({ domains });
  }

  makeDataForXYAxis() {
    let data = this.state.historyByDate;

     console.log('inside makeDataForXYAxis: ', data);

    let max = 0;
    let min = 0;
    let totalDomainCount = [];


      // calculate month based on startDate day and month
      const date = this.state.startDate;

      const startDate = {
        day: parseInt(date.slice(8, 10), 10),
        month: parseInt(date.slice(5, 7), 10),
        year: parseInt(date.slice(0, 4), 10)
      }

      const endDate = {
        day: startDate.day - this.state.daysAgo,
        month: startDate.month,
        year: startDate.year
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

    for (let domain in this.state.historyByDate) {
        if (domain === selectedDomain) {
          let domainObj = {};
          domainObj[domain] = this.state.historyByDate[domain];

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
          <DateOptions
            handleStartDateChange={this.handleStartDateChange.bind(this)}
            handleDaysAgoChange={this.handleDaysAgoChange.bind(this)}

            startDate={this.state.startDate}
            daysAgo={this.state.daysAgo}
     
            handleSubmit={this.handleSubmit.bind(this)}
          />

        <div className='refresh'>
          <button onClick={this.refresh.bind(this)}> Start Over! </button>
        </div>

        {this.renderDomainLists()}

        {this.renderGraph()}
  
      </div>
    );
  }
};

export default LineGraphParent;
