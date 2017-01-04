const UserDomain = require('../../../db/schema').UserDomain;

const addDomainToday = (domainIds, userId, date) => {
  for (let domain of domainIds) {

     UserDomain.findAll({ where: { userId, domainId: domain.id, date_added: date } })
      .then((userDomain) => {
        // if no domains saved for today's date, add domain to table
         if (userDomain.length === 0) {
          UserDomain.create({ count: domain.totalCount, date_added: date, domainId: domain.id, userId: userId })
                    .catch((error) => {
                      console.log('unable to save in users domains table', error);
                    });
          } else {
            let currentCount = userDomain[0].dataValues.count;
            userDomain[0].update({ count: currentCount + domain.totalCount });
          }    
      });
    }
};


module.exports = addDomainToday;