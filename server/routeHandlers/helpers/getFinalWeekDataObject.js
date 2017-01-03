const getAllDomainNames = require('./getAllDomainNames');

const getFinalWeekDataObject = (domainIdsWeekDataObject) => {
  const domainIDs = Object.keys(domainIdsWeekDataObject);

  return getAllDomainNames(domainIDs)
    .then((domainsArray) => {
      const finalWeekData = {};

      domainsArray.map((domain) => {
        if (domainIdsWeekDataObject[domain.dataValues.id]) {
          finalWeekData[domain.dataValues.domain] = domainIdsWeekDataObject[domain.dataValues.id];
        }
      });
      return finalWeekData;
    });
};

module.exports = getFinalWeekDataObject;
