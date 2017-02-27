const User = require('../../../db/schema').User;
const addDomainToday = require('./addDomainToday');

const addDomainsForToday = (domainObjsArray, chromeID, dateToday) => {

  return User.findOne({ where: { chromeID } })
    .then((user) => {
      return addDomainToday(domainObjsArray, user.dataValues.id, dateToday);
    });
};

module.exports = addDomainsForToday;
