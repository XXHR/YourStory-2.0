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
import cloneObject from './cloneFunction';

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
    const today = new Date();

    const startDateWeek = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    }

    const daysAgo = 6;

    const reformattedDate = moment([startDateWeek.year, startDateWeek.month - 1, startDateWeek.day]).format().slice(0, 10);

    axios({
      method: 'post',
      // url: `${HostPort}/api/historyByDate`,
      url: 'http://localhost:5000/api/historyByDate',
      data: { dateRange: { startDate: startDateWeek, daysAgo }, chromeID: this.props.chromeID }
    }).then((response) => {
      console.log('line graph parent default response: ', response.data);
      this.setState({ startDate: reformattedDate, daysAgo, historyByDate: response.data });
    })

  }


  componentDidUpdate(prevProps, prevState) {
    // console.log('LINE GRAPH PARENT PREVIOUS STATE: ', prevState.historyByDate);

    // console.log('LINE GRAPH PARENT CURRENT STATE: ', this.state.historyByDate);

    if (JSON.stringify(prevState.historyByDate) !== JSON.stringify(this.state.historyByDate) && Object.keys(this.state.historyByDate).length !== 0) {
      this.makeDomainList();
      this.makeDataForXYAxis();
    }

    // for each selected domain, pass selected domain string(s) into makeDataForXYAxis to re-calculate max and min values for y axis
      // ** consider splitting xyaxis generator into separate functions
        // makeDataForYAxis(selectedDomains)
          // find selected domains from historyByDate data
          // calculate max and min values, set state
        // makeDataForXAxis(data) // based on form data

    if (prevState.selectedDomain1 !== this.state.selectedDomain1) {
      this.makeDataForDomainLines(this.state.selectedDomain1, 1);
      this.makeXAxis();
    }

     if (prevState.selectedDomain2 !== this.state.selectedDomain2) {
      this.makeDataForDomainLines(this.state.selectedDomain2, 2);
      this.makeXAxis();
    }

     if (prevState.selectedDomain3 !== this.state.selectedDomain3) {
      this.makeDataForDomainLines(this.state.selectedDomain3, 3);
      this.makeXAxis();
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
      year: parseInt(date.slice(0, 4), 10),
    };

    axios({
      method: 'post',
      url: `${HostPort}/api/historyByDate`,
      data: { dateRange: { startDate, daysAgo: this.state.daysAgo } },
    }).then((response) => {
      console.log('response after form: ', response.data);
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

  makeXAxis() {
    const data = this.state.historyByDate;
    // find selected domains from historyByDate
    // calculate max and min values, set state

    const selectedDomains = [this.state.selectedDomain1, this.state.selectedDomain2, this.state.selectedDomain3];

    // iterate through selected domains
      // if not an empty string, find matching domain historyByDate data 
        // push count into array 
    // grab max and min values from array, set state

    const totalDomainCount = [];

    for (let domain in data) {
      if (selectedDomains.includes(domain)) {
        data[domain].forEach((countDate) => {
          totalDomainCount.push(countDate.count);
        })
      }     
    }

    const max = Math.max(...totalDomainCount);
    const min = Math.min(...totalDomainCount);

    console.log('max: ', max, 'min: ', min);

    this.setState({ max, min });

  }


  makeDataForXYAxis() {
    let data = this.state.historyByDate;

    let max = 0;
    let min = 0;
    const totalDomainCount = [];

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

    // console.log('max: ', max, 'min: ', min);

    this.setState({ startDate, endDate, max, min });

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

  makeDataForDomainLines(selectedDomain, id) {

    const copyData = cloneObject(this.state.historyByDate);

    // for any domain chosen from any dropdown menu, find associated data in historyByDate
    // push domain's object value into this.state.selectedDomains array
    let selectedDomains = [];

    selectedDomains.push(id);

    for (let domain in copyData) {
        if (domain === selectedDomain) {
          let domainObj = {};
          domainObj[domain] = copyData[domain];

          if (Object.keys(domainObj).length + 1 === this.state.daysAgo) {
            selectedDomains.push(domainObj);
          } else {
          // console.log('addMissingDates: ', this.addMissingDates(domainObj));

            selectedDomains.push(this.addMissingDates(domainObj));
          }

        }
    }

    this.setState({ selectedDomains });

  }

  renderDateOptions() {
       return ( <div className='lineGraph'>
            <DateOptions
              handleStartDateChange={this.handleStartDateChange.bind(this)}
              handleDaysAgoChange={this.handleDaysAgoChange.bind(this)}

              startDate={this.state.startDate}
              daysAgo={this.state.daysAgo}
       
              handleSubmit={this.handleSubmit.bind(this)}
            />
          </div>
        )
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
    }
  }

  refresh() {
    this.setState(this.baseState);
  }

  renderRefresh() {
    return (
      <div className='refresh'>
        <button onClick={this.refresh.bind(this)}> Start Over! </button>
      </div>
    )
  }

  renderNoDataToShow() {
    if (typeof this.state.historyByDate === 'object' && Object.keys(this.state.historyByDate).length === 0) {
      return <p> No data to show for these dates! </p>
    }
  }

  render() {
    // const domainListData = [this.state.domains, this.state.domains, this.state.domains];

    return (
        <div>
          {this.renderDateOptions()}

          {this.renderRefresh()}

          {this.renderDomainLists()}

          {this.renderGraph()}

          {this.renderNoDataToShow()}
        </div>
      )
    }
};

const mapStateToProps = (state) => {
  return {
    chromeID: state.chromeID
  };
}

export default connect(mapStateToProps)(LineGraphParent);

// export default LineGraphParent;
