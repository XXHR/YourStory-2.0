'use strict';

const getAllUserDomainIDs = require('./helpers/getAllUserDomainIDs');
const getAllDomainNames = require('./helpers/getAllDomainNames');
const getUser = require('./helpers/getUser');
const DateRange = require('./helpers/createDateArray');
const mapDomainIdsArrayToWeekDataObject = require('./helpers/mapDomainIdsArrayToWeekDataObject');

module.exports = (req, res) => {
  const week = new DateRange().createDateArray();
  const chromeID = req.session.chromeID || '12345';

  getUser(chromeID)
    .then((userID) => {
      // TODO - refactor getUser helper function so that it returns the entire user object not jsut the ID so that it's more functional
      // change parameter on line 13 to user not userID
      // var userID = user.dataValues.id;
      return getAllUserDomainIDs(userID, week);
    })
    .then((userDomainIdResultsArray) => {
      return mapDomainIdsArrayToWeekDataObject(userDomainIdResultsArray);
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
