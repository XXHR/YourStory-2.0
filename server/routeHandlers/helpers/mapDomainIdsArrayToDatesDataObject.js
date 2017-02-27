const mapDomainIdsArrayToDatesDataObject = (domainIdsByUserArray) => {
  const datesDomains = {};

  domainIdsByUserArray.map((domain) => {
    if (!datesDomains[domain.dataValues.domainId]) {
      datesDomains[domain.dataValues.domainId] = [];
    }
    datesDomains[domain.dataValues.domainId].push({ date: domain.dataValues.date_added,
      count: domain.dataValues.count });
  });

  return datesDomains;
};

module.exports = mapDomainIdsArrayToDatesDataObject;
