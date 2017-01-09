const Domain = require('../../../db/schema').Domain;
const Category = require('../../../db/schema').Category;

const axios = require('axios');
const btoa = require('btoa');

const saveDomains = (uniqueDomains) => {

  for (let domainKey in uniqueDomains) {
    Domain
      .findOrCreate({ where: { domain: domainKey } })
      .then((domain) => {
        // check if domain has category
        domain[0].getCategory()
          .then((category) => {
            if (category === null) {
              const apiUrl = 'https://api.webshrinker.com/categories/v2/';
              const hashURL = btoa('http://www.' + domain[0].dataValues.domain);
              axios({
                method: 'get',
                url: apiUrl + hashURL,
                auth: {
                  username: 'UL1QVH3FAtR6eoEJJIs4',
                  password: 'ZCZCYLA6wtqYNDpxbbRE',
                },
              })
              .then((response) => {
                Category
                .findOrCreate({ where: { category: response.data.data[0].categories[0] } })
                .then((cat) => {
                  domain[0].updateAttributes({
                    categoryId: cat[0].dataValues.id,
                  });
                })
                .catch((err) => {
                  console.log('error finding or creating category', err);
                });
              })
              .catch((err) => {
                console.log('error getting category from webshrinker', err);
              });
            }
          });
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