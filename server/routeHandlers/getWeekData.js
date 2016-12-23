'use strict';

const getAllUserDomainIDs = require('./helpers/getAllUserDomainIDs');
const getAllDomainNames = require('./helpers/getAllDomainNames');
const getUser = require('./helpers/getUser');
const DateRange = require('./helpers/createDateArray');

module.exports = (req, res) => {
  const week = new DateRange().createDateArray();
  const chromeID = req.session.chromeID || '12345';

  getUser(chromeID)
    .then((userID) => {
      return getAllUserDomainIDs(userID, week);
    })
    .then((userDomainIdResultsArray) => {
      const weekDomains = {};

      userDomainIdResultsArray.map((domain) => {
        if (!weekDomains[domain.dataValues.domainId]) {
          weekDomains[domain.dataValues.domainId] = [];
        }
        weekDomains[domain.dataValues.domainId].push({ date: domain.dataValues.date_added,
          count: domain.dataValues.count });
      });

      return weekDomains;
    })
    .then((weekDomains) => {
      const domainIDs = Object.keys(weekDomains);

      getAllDomainNames(domainIDs)
        .then((domainsArray) => {
          const finalWeekData = {};

          domainsArray.map((domain) => {
            if (weekDomains[domain.dataValues.id]) {
              finalWeekData[domain.dataValues.domain] = weekDomains[domain.dataValues.id];
            }
          });

          res.status(200).json(finalWeekData);
        });
    })
    .catch((err) => {
      console.log('Error creating weekData ', err);
      res.sendStatus(404);
    });
};
