const UserDomain = require('../../../db/schema').UserDomain;

const getAllUserDomainIdsByWeekAndUserId = (userID, week) => {
  return UserDomain.findAll({ where: { userId: userID, $and: { date_added: week } } });
};

module.exports = getAllUserDomainIdsByWeekAndUserId;
