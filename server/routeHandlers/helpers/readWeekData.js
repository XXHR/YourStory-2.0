1// TODO - refactor getUser helper function
// so that it returns the entire user object
// not just the ID so that it's more functional
// change parameter on line 17 to user not userID
// var userID = user.dataValues.id;

const DateRange = require('./createDateArray');
const getUser = require('./getUser');
const getAllUserDomainIdsByWeekAndUserId = require('./getAllUserDomainIdsByWeekAndUserId');
const mapDomainIdsArrayToWeekDataObject = require('./mapDomainIdsArrayToWeekDataObject');
const getFinalWeekDataObject = require('./getFinalWeekDataObject');


const readWeekData = (chromeID) => {
  const week = new DateRange().createDateArray();

  return getUser(chromeID)
    .then((userID) => {
      return getAllUserDomainIdsByWeekAndUserId(userID, week);
    })
    .then((domainIdsArray) => {      
      return mapDomainIdsArrayToWeekDataObject(domainIdsArray);
    })
    .then((domainIdsWeekDataObject) => {
      return getFinalWeekDataObject(domainIdsWeekDataObject);
    })
}

module.exports = readWeekData;





