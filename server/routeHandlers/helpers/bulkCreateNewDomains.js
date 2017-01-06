const Domain = require('../../../db/schema');

const bulkCreateNewDomains = (uniqueDomains) => {
   return Domain.findAll({ where: { domain: Object.keys(uniqueDomains) } })
    .then((domains) => {

      const exisitingDomains = domains.map((domain) => {
        return domain.dataValues.domain;
      });

      // iterate through uniqueDomains keys list
        // if key is not in exisitingDomains array, return that key
      // bulk create only the domains that don't exist already

      const domainsToCreate = Object.keys(uniqueDomains).filter((domain) => {
        if (!exisitingDomains.includes(domain)) {
          return domain;
        }
      });

      const domainsBulkCreate = domainsToCreate.map((domain) => {
        return { domain };
      });

      return Domain.bulkCreate(domainsBulkCreate);
    });
};

module.exports = bulkCreateNewDomains;