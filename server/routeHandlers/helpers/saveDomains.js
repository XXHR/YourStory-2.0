const Domain = require('../../../db/schema').Domain;

const saveDomains = (uniqueDomains) => {
  for (let domain in uniqueDomains) {
    Domain
      .findOrCreate({ where: { domain: key } })
      .then(() => {

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