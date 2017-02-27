const UserDomain = require('../../../db/schema').UserDomain;

const getAllUserDomainIdsByDatesAndUserId = (userID, dates) => {
  return UserDomain.findAll({ where: { userId: userID, $and: { date_added: dates } } });
};

module.exports = getAllUserDomainIdsByDatesAndUserId;
