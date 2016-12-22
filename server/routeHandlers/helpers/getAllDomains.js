const Domain = require('../../../db/schema').Domain;

const getAllDomains = (domainIDs) => {
  return new Promise((resolve, reject) => {
    return resolve(Domain.findAll({ where: { id: domainIDs } }));
  });
};

module.exports = getAllDomains;
