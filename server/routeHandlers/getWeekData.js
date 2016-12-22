'use strict';

const UserDomain = require('../../db/schema').UserDomain;
const Domain = require('../../db/schema').Domain;
const getUser = require('./helpers/getUser');
const DateRange = require('./helpers/createDateArray');
const getAllDomains = require('./helpers/getAllDomains');

module.exports = (req, res) => {
  const week = new DateRange().createDateArray();
  const chromeID = req.session.chromeID || '12345';

  getUser(chromeID)
    .then((userID) => {
      return UserDomain.findAll({ where: { userId: userID, $and: { date_added: week } } });
    })
    .then((allResults) => {
      const weekDomains = {};

      allResults.map((domain) => {
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

      getAllDomains(domainIDs)
      .then((domainsArr) => {
        const finalWeekData = {};
        domainsArr.map((domain) => {
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
