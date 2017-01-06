const Domain = require('../../../db/schema').Domain;
const Category = require('../../../db/schema').Category;

const axios = require('axios');
const btoa = require('btoa');

const saveDomains = (uniqueDomains) => {
  return Domain.findOrCreate({ where: { domain: Object.keys(uniqueDomains) } })
  .then((domains) => {
    console.log('DID IT MAKE THE DOMAINS LETS SEE', domains)
  })
};


module.exports = saveDomains;