const Domain = require('../../../db/schema').Domain;
const tallyVisitCount = require('./tallyVisitCount');

const mapDomainsToDomainObjsArray = (uniqueDomains) => {
  return Domain.findAll({ attributes: ['id', 'domain'], where: { domain: Object.keys(uniqueDomains) } })
    .then((domains) => {
      const domainObjsArray = domains.map((domain) => {
      const totalCount = tallyVisitCount(uniqueDomains[domain.dataValues.domain]);
      return { id: domain.dataValues.id, domain: domain.dataValues.domain, totalCount };
    });

      return domainObjsArray;
    });
};

module.exports = mapDomainsToDomainObjsArray;