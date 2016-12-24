const DateRange = require('./createDateArray');
const getUser = require('./getUser');
const getAllUserDomainIDs = require('./getAllUserDomainIDs');
const mapDomainIdsArrayToWeekDataObject = require('./mapDomainIdsArrayToWeekDataObject');
const getFinalWeekDataObject = require('./getFinalWeekDataObject');

const getWeekDataFromDB = (chromeID) => {
  const week = new DateRange().createDateArray();

  return getUser(chromeID)
    .then((userID) => {
      return getAllUserDomainIDs(userID, week);
    })
    .then((domainIdsArray) => {
      return mapDomainIdsArrayToWeekDataObject(domainIdsArray);
    })
    .then((domainIdsWeekDataObject) => {
      return getFinalWeekDataObject(domainIdsWeekDataObject);
    })
}

module.exports = getWeekDataFromDB;