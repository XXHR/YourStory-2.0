const getUser = require('./helpers/getUser');
const User = require('../../db/schema').User;
const saveDomains = require('./helpers/saveDomains');
const tallyVisitCount = require('./helpers/tallyVisitCount');
const UserDomain = require('../../db/schema').UserDomain;
const Domain = require('../../db/schema').Domain;
const addDomainToday = require('./helpers/addDomainToday');


module.exports.postHistory = (req, res) => {

  // parse through user's chrome history in req.body
  const allHistory = req.body.history;
  // ============= add parsed domain to each history object in allData array ================
  allHistory.map((historyItem) => {
    const url = historyItem.url;
    let domain;
    if (url.indexOf('://') > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
    if (domain.slice(0, 4) === 'www.') {
      domain = domain.slice(4);
    }
    domain = domain.split(':')[0];
    historyItem.domain = domain;
    return historyItem;
  });

  // ================ add unique domains to uniqueDomains object ============
  const uniqueDomains = {};

  allHistory.map((historyItem) => {
    if (uniqueDomains[historyItem.domain]) {
      return uniqueDomains[historyItem.domain].push(historyItem);
    }
    uniqueDomains[historyItem.domain] = [historyItem];
    return uniqueDomains[historyItem.domain];
  });

  // console.log('UNIQUE DOMAINS', uniqueDomains);

  // ======== promised functions ==========

  // const promisedSavedDomains = new Promise((resolve, reject) => {
  //   return resolve(saveDomains(uniqueDomains));
  // });

  // const promisedGetUser = new Promise((resolve, reject) => {
  //   return resolve(getUser(req.session.chromeID));
  // })

  // ================ get today's date ===============
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const day = (today.getDate()).toString();

  const date = year + '-' + month + '-' + day;

  // ================ add saved domains to users_domains table =============

  Domain.findAll({ where: { domain: Object.keys(uniqueDomains) } })
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
  .then(() => {

    return Domain.findAll({ attributes: ['id', 'domain'], where: { domain: Object.keys(uniqueDomains) } })
  })
  .then((domains) => {
    const domainIds = domains.map((domain) => {
      const totalCount = tallyVisitCount(uniqueDomains[domain.dataValues.domain]);
      return { id: domain.dataValues.id, domain: domain.dataValues.domain, totalCount };
    });

    return domainIds;
  })
  .then((domainIds) => {
    console.log('DOMAIN IDS', domainIds);

    User.findOne({ where: { chromeID: '12345' } })
    .then((user) => {
      return addDomainToday(domainIds, user.dataValues.id, date);
    })
    .then(() => {
      res.sendStatus(200);
    });
  });

};

