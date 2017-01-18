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
  if (dateRange === 'week') {
    const dates = new DateRange().createDateArray();
  } else {
    const startDate = dateRange.startDate;
    const endDate = startDate - dateRange.endDate;
    const year = dateRange.year;
    const month = dateRange.month;

    const dates = new DateRange(startDate, month, year, endDate).createDateArray();  
  }

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
