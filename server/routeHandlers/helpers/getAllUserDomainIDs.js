const UserDomain = require('../../../db/schema').UserDomain;

const getAllUserDomainIDs = (userID, week) => {
  return UserDomain.findAll({ where: { userId: userID, $and: { date_added: week } } });
};

module.exports = getAllUserDomainIDs;
