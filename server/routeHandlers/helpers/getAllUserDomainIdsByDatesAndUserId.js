const UserDomain = require('../../../db/schema').UserDomain;

const getAllUserDomainIdsByDatesAndUserId = (userID, dates) => {
  console.log('dates in getAllUserDomainIdsByDatesAndUserId', dates);
  return UserDomain.findAll({ where: { userId: userID, $and: { date_added: dates } } });
};

module.exports = getAllUserDomainIdsByDatesAndUserId;
