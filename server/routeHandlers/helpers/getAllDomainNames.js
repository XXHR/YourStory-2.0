const Domain = require('../../../db/schema').Domain;

const getAllDomainNames = (domainIDsArray) => {
  return Domain.findAll({ where: { id: domainIDsArray } });
};

module.exports = getAllDomainNames;
