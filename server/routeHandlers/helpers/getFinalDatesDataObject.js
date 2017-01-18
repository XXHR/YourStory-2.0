const getAllDomainNames = require('./getAllDomainNames');

const getFinalDatesDataObject = (domainIdsDatesDataObject) => {
  const domainIDs = Object.keys(domainIdsDatesDataObject);

  return getAllDomainNames(domainIDs)
    .then((domainsArray) => {
      const finalDatesData = {};

      domainsArray.map((domain) => {
        if (domainIdsDatesDataObject[domain.dataValues.id]) {
          finalDatesData[domain.dataValues.domain] = domainIdsDatesDataObject[domain.dataValues.id];
        }
      });
      return finalDatesData;
    });
};

module.exports = getFinalDatesDataObject;
