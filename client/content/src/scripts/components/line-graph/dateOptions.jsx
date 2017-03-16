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

    console.log('DateOptions props', props);

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('DateOptions PROPS CHANGED', nextProps, 'DateOptions CURRENT PROPS', this.props);

    // if (nextProps.startDate !== this.props.startDate) {

    //   console.log('start date different date options');

    //   this.setState({ startDate: nextProps.startDate, daysAgo: nextProps.daysAgo })
    //   return true;
    // }

    if (nextProps.daysAgo !== this.props.daysAgo && nextProps.startDate !== this.props.startDate) {
      console.log('CHECKING DateOptions STATE', this.props);
      return true;
    } else {
      return true;
    }

  }

  render() {
    return (
      <div id='date-options'>
          <input type='date' value={this.props.startDate} onChange={this.props.handleStartDateChange}/>

          How many days ago would you like to see your browsing acitivty? <input type='number' value={this.props.daysAgo} onChange={this.props.handleDaysAgoChange} />

          <button onClick={this.props.handleSubmit}> Sumbit </button>
      
      </div>
    )
  }
}

export default DateOptions;
