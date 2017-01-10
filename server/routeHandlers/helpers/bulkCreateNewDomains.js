const Domain = require('../../../db/schema').Domain;
const Category = require('../../../db/schema').Category;

const axios = require('axios');
const btoa = require('btoa');

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

    })
    .then((domains) => {
      for (let domain of domains) {
        console.log('DOMAIN', domain.dataValues.domain)
        const apiUrl = 'https://api.webshrinker.com/categories/v2/';
        const hashURL = btoa('http://www.' + domain.dataValues.domain);
        axios({
          method: 'get',
          url: apiUrl + hashURL,
          auth: {
            username: 'UL1QVH3FAtR6eoEJJIs4',
            password: 'ZCZCYLA6wtqYNDpxbbRE',
          },
        })
        .then((response) => {
          return Category.findOrCreate({ where: { category: response.data.data[0].categories[0] } });
        })
        .catch((err) => {
          console.log('error getting category from webshrinker', err);
        })
        .then((cat) => {
          Domain.findOne({ where: { domain: domain.dataValues.domain } })
          .then((domain) => {
            return domain.update({ categoryId: cat[0].dataValues.id });
          })
        })
        .catch((err) => {
          console.log('error finding or creating category', err);
        });
      }
    });
};

module.exports = bulkCreateNewDomains;