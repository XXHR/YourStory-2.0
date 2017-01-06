const mapHistoryToUniqueDomainsObj = require('./mapHistoryToUniqueDomainsObj');
const getDateToday = require('./getDateToday');
const bulkCreateNewDomains = require('./bulkCreateNewDomains');
const mapDomainsToDomainObjsArray = require('./mapDomainsToDomainObjsArray');
const addDomainsForToday = require('./addDomainsForToday');
const getVisData = require('./getVisData');


const postHistoryData = (allHistory, chromeID) => {
  const uniqueDomains = mapHistoryToUniqueDomainsObj(allHistory);
  const dateToday = getDateToday();

  return bulkCreateNewDomains(uniqueDomains)
    .then(() => {
      return mapDomainsToDomainObjsArray(uniqueDomains);
    })
    .then((domainObjsArray) => {
      return addDomainsForToday(domainObjsArray, chromeID, dateToday);
    })
    .then(() => {
      return getVisData(chromeID);
    });
};

module.exports = postHistoryData;