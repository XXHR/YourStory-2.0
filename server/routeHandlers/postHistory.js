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
  // promisedSavedDomains
  // .then(() => {
  //   return User.findOne({ where: { chromeID: '12345' } })
  // })
  User.findOne({ where: { chromeID: '12345' } })
  .then((user) => {
    // const userId = user.dataValues.id;
    // return Domain.findAll({ where: { domain: Object.keys(uniqueDomains) } })
    let domains = Object.keys(uniqueDomains).map((domain) => {
      return { domain: domain };
    })
    console.log('DOMAINS ARRAY FOR BULK CREATE', domains);
    return Domain.bulkCreate(domains);
  })
  .then((domains) => {
    // console.log('FINDING ALL DOMAINS', domains.length);
    console.log('DID IT MAKE THE DOMAINS LETS SEE', domains.length)
  })
};

