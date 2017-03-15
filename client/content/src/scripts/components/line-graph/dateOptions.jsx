import React from 'react';

// const getHistoryByDate = (dates) => {
//   const data = {
//     type: 'get-history-by-date',
//     payload: dates
//   };

//   return data;
// }

class DateOptions extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidUpdate() {
  //   console.log('Date Options state', this.state);
  // }

  render() {
    return (
      <div>
       
          <input type='date' value={this.props.startDate} onChange={this.props.handleStartDateChange}/>

          How many days ago would you like to see your browsing acitivty? <input type='number' value={this.props.daysAgo} onChange={this.props.handleDaysAgoChange} />

          <button onClick={this.props.handleSubmit}> Sumbit </button>
      
      </div>
    )
  }
}

export default DateOptions;
