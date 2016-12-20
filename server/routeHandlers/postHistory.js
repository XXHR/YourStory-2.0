// const getUser = require('./helpers/getUser');
const User = require('../../db/schema').User;
const saveDomains = require('./helpers/saveDomains');
const tallyVisitCount = require('./helpers/tallyVisitCount');
const UserDomain = require('../../db/schema').UserDomain;
const Domain = require('../../db/schema').Domain;
const addDomainToday = require('./helpers/addDomainToday');


module.exports.postHistory = (req, res) => {

  const allHistory = req.body.history;
  // parse through user's chrome history in req.body
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

  console.log('tallyVisitCount', uniqueDomains);

  // ======== promised functions ==========

  const promisedSavedDomains = new Promise((resolve, reject) => {
    return resolve(saveDomains(uniqueDomains));
  });

  // ================ get today's date ===============
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const day = (today.getDate()).toString();

  const date = year + '-' + month + '-' + day;

  // ================ add saved domains to users_domains table =============
  promisedSavedDomains
    .then(() => {
      User.findOne({ where: { chromeID: '12345' } })
        .then((user) => {
          const userId = user.dataValues.id;
          // iterate through uniqueDomains list
          for (let domainKey in uniqueDomains) {
            // find each domain in list
            Domain.findOne({ where: { domain: domainKey } })
              .then((domain) => {
                console.log('domain', domain.id);
                const domainId = domain.id;
                const totalCount = tallyVisitCount(uniqueDomains[domainKey]);

                // search for domain in users domains list from today
                UserDomain.findAll({ where: { userId: userId, domainId: domainId, date_added: date } })
                  .then((userDomains) => {
                    // if no domains saved for today's date, add domain to table
                     if (userDomains.length === 0) {
                      UserDomain.create({ count: totalCount, date_added: date, domainId: domainId, userId: userId })
                                .catch((error) => {
                                  console.log('unable to save in users domains table', error);
                                });
                      }

                      // add or update domain for user for today's date

                      const promisedAddDomainsToday = new Promise((resolve, reject) => {
                        return resolve(addDomainToday(userDomains, domainId, date));
                      });

                      promisedAddDomainsToday
                        .then(() => {
                          console.log('DOMAIN ADDED FOR TODAY');
                          // ===== send VIS DATA ?? ======
                          res.sendStatus(200);
                        })
                  })
                  .catch((err) => {
                    console.log('error fetching all user domains', err);
                  });
              })
              .catch((err) => {
                console.log('error finding domain', err);
              });
          }
        })
        .catch((err) => {
          console.log('error finding user', err);
        });
    });
};

