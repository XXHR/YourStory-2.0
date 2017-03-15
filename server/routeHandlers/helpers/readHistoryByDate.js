// TODO - refactor getUser helper function
// so that it returns the entire user object
// not just the ID so that it's more functional
// change parameter on line 17 to user not userID
// var userID = user.dataValues.id;

const DateRange = require('./createDateArray');
const getUser = require('./getUser');
const getAllUserDomainIdsByDatesAndUserId = require('./getAllUserDomainIdsByDatesAndUserId');
const mapDomainIdsArrayToDatesDataObject = require('./mapDomainIdsArrayToDatesDataObject');
const getFinalDatesDataObject = require('./getFinalDatesDataObject');


const readHistoryByDate = (chromeID, dateRange) => {
  console.log('date range from client', dateRange);

  let dates;

  // if (dateRange === 'week') {
  //   dates = new DateRange().createDateArray();
  // } else {
    let startDay = dateRange.startDay;
    let endDay = startDay - dateRange.endDay;
    let year = dateRange.year;
    let month = dateRange.month;

    console.log('startDate', startDay, 'endDate', endDay, 'year', year, 'month', month);

    dates = new DateRange(startDay, month, year, endDay).createDateArray();
  // }

  console.log('dateRange', dates);

  return getUser(chromeID)
    .then((userID) => {
      return getAllUserDomainIdsByDatesAndUserId(userID, dates);
    })
    .then((domainIdsArray) => {  
      return mapDomainIdsArrayToDatesDataObject(domainIdsArray);
    })
    .then((domainIdsDatesDataObject) => {
      return getFinalDatesDataObject(domainIdsDatesDataObject);
    });
}

module.exports = readHistoryByDate;
