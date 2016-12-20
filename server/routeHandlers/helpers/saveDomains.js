const Domain = require('../../../db/schema').Domain;
// require btoa for web shrinker api call 

const saveDomains = (uniqueDomains) => {
  for (let domain in uniqueDomains) {
    Domain
      .findOrCreate({ where: { domain: key } })
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
}

const promisedSavedDomains = new Promise((resolve, reject) => {
  return resolve(saveDomains());
});

module.exports = promisedSavedDomains;