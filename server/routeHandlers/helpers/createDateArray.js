class DateRange {
  constructor(startDay, startMonth, startYear, endDay, step) {
    // defaults to one week ago if provided no arguments
    // currently, it can return an array of dates up to 31 days
    this.start = startDay || new Date().getDate();
    this.end = endDay || this.start - 6;
    this.step = step || -1;
    this.month = startMonth || new Date().getMonth() + 1;
    this.year = startYear || new Date().getFullYear();
  }

  getDatesForRange() {
    const rangeArray = [];
    if (this.start > this.end) {
      for (let i = this.start; i >= this.end; i += this.step) {
        rangeArray.push(i);
      }
    } else {
      for (let i = this.start; i <= this.end; i += this.step) {
        rangeArray.push(i);
      }
    }
    return rangeArray;
  }

  getLengthOfMonth(month) {
    let daysInTheMonth;
    const isLeap = (this.year % 4 === 0);
    switch (month) {
      case 4:
      case 6:
      case 9:
      case 11:
        daysInTheMonth = 30;
        break;
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        daysInTheMonth = 31;
        break;
      case 2:
        daysInTheMonth = isLeap ? 29 : 28;
        break;
      default:
        daysInTheMonth = 31;
    }
    return daysInTheMonth;
  }

  validateRange() {
    const range = this.getDatesForRange();
    const validRange = [];
    let monthLength;

    for (let j = 0; j < range.length; j += 1) {
      let date = range[j];
        if(this.step < 0) {
          monthLength = this.getLengthOfMonth(this.month - 1);
          if (date <= 0) {
            date = monthLength + date;
          }
        }
        if(this.step > 0) {
          monthLength = this.getLengthOfMonth(this.month);
            if(date > monthLength) {
             date = monthLength - date;
             date *= -1;
            }
        }
      validRange.push(date);
    }
    return validRange;
  }

  createDateArray() {
    const validRange = this.validateRange();
    const finalDateArray = [];
    let month = this.month;
    let year = this.year;
    let monthLength;

    for (let i = 0; i < validRange.length; i += 1) {
      const day = validRange[i];
      if(this.step < 0) {
        monthLength = this.getLengthOfMonth(this.month - 1);
        if(day === monthLength) {
          month -= 1;
          if(month === 0) {
            month = 1;
            year -= 1;
          }
        }
      }
      if(this.step > 0) {
        if(day === 1) {
          month += 1;
          if(month === 13) {
            month = 1;
            year += 1;
          }
        }
      }

      finalDateArray.push(year + '-' + month + '-' + day);
    }
    return finalDateArray;
  }
}

module.exports = DateRange;
// USE:
// create a new instance of the constructor and pass no arguments to get a default output
// default output: array of the prior week's dates (in reverse order)
// create a new instance, passing argumemts, to get a range from and to custom dates
// pass in a step of 1 to get the data in ascending order

// EXAMPLES:
// to output the default 7 days prior array:
// const lastWeek = new DateRange().createDateArray();

// to output 30 days of data, from Feb 14 2015:
// const date = new Date(2015,2,14);
// const startDay = date.getDate();
// const month = date.getMonth();
// const year = date.getFullYear();
// const endDay = startDay + 30;
// const oneMonth = new DateRange(startDay, month, year, endDay, 1).createDateArray();
