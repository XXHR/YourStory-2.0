const UserDomain = require('../../../db/schema');

const addDomainToday = (userDomains, domainId, todayDate) => {
  for (let domain of userDomains) {
    if (domain.dataValues.domainId === domainId) {
      console.log('update count');
      let currentCount = domain.dataValues.count;
      domain.update({ count: currentCount + 200 });
    } else {
      console.log('DOMAIN ID: ', domainId);
      UserDomain.create({ count: 100, date_added: todayDate, domainId: domainId, userId: user.id })
                .catch((error) => {
                console.log('unable to save in users domains table', error)
              })
    }
  }
};


module.exports = addDomainToday;