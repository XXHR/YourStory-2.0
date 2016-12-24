const mapDomainIdsArrayToWeekDataObject = (userDomainIdResultsArray) => {
  const weekDomains = {};

  userDomainIdResultsArray.map((domain) => {
    if (!weekDomains[domain.dataValues.domainId]) {
      weekDomains[domain.dataValues.domainId] = [];
    }
    weekDomains[domain.dataValues.domainId].push({ date: domain.dataValues.date_added,
      count: domain.dataValues.count });
  });

  return weekDomains;
};

module.exports = mapDomainIdsArrayToWeekDataObject;
