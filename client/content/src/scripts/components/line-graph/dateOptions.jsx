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

    console.log('props from date options', props);

    this.state = {
    }



  }

  // componentDidUpdate() {
  //   console.log('Date Options state', this.state);
  // }

  render() {
    return (
      <div>
       
          Start Day: <input type='number' value={this.props.startDayValue} name='startDay' onChange={this.props.handleStartDayChange} />
          End Day: <input type='number' value={this.props.endDayValue} name='EndDay' onChange={this.props.handleEndDayChange} />
          Month: <input type='number' value={this.props.monthValue} name='Month' onChange={this.props.handleMonthChange} />
          Year: <input type='number' value={this.props.yearValue} name='Year' onChange={this.props.handleYearChange} />
          <button onClick={this.props.handleSubmit}> Sumbit </button>
      
      </div>
    )
  }
}

export default DateOptions;
