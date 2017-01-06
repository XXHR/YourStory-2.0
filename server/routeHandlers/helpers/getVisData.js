const User = require('../../../db/schema').User;

const getVisData = (chromeID) => {
  return User.findOne({ where: { chromeID } })
      .then((user) => {
        return user.getDomains();
      })
      .then((domains) => {
        let visData = {};
        for (const domain of domains) {
          if (visData[domain.dataValues.domain]) {
            visData[domain.dataValues.domain] += domain.dataValues.users_domains.count;
          } else {
            visData[domain.dataValues.domain] = domain.dataValues.users_domains.count;
          }
        }
        console.log('vis data', visData);
        return visData;
      })
      .catch((err) => {
        console.log('error fetching user domains', err);
      });
};

module.exports = getVisData;
