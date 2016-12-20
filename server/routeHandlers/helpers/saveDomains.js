const Domain = require('../../../db/schema').Domain;
// require btoa for web shrinker api call

const uniqueDomains = require('../postHistory').uniqueDomains;

const saveDomains = (uniqueDomains) => {

  for (let domainKey in uniqueDomains) {
    Domain
      .findOrCreate({ where: { domain: domainKey } })
      .then((domain) => {

        // check if domain has category
          // if no, fetch category from api 


      })
      .catch((err) => {
        console.log('error saving domains', err);
      })
      .done(() => {
        console.log('Done saving all domains');
      });
  }
};


module.exports = saveDomains;