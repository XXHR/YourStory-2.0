const UserDomain = require('../../../db/schema');

const addDomainToday = (userDomains, domainId, todayDate, totalCount) => {
  for (let domain of userDomains) {
    if (domain.dataValues.domainId === domainId) {
      let currentCount = domain.dataValues.count;
      domain.update({ count: currentCount + totalCount });
    } else {
      UserDomain.create({ count: totalCount, date_added: todayDate, domainId: domainId, userId: user.id })
                .catch((error) => {
                console.log('unable to save in users domains table', error)
              })
    }
  }
};


module.exports = addDomainToday;