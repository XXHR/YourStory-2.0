const UserDomain = require('../../../db/schema').UserDomain;

const readOrWriteDomainForUser = (userId, domainId, totalCount, date) => {    
  return UserDomain.findAll({ where: { userId, domainId, date_added: date } })
    .then((userDomain) => {
      // if no domains saved for today's date, add domain to table
       if (userDomain.length === 0) {
        UserDomain.create({ count: totalCount, date_added: date, domainId, userId })
                  .catch((error) => {
                    console.log('unable to save in users domains table', error);
                  });
        } else {
          let currentCount = userDomain[0].dataValues.count;
          userDomain[0].update({ count: currentCount + totalCount })
          .catch((error) => {
              console.log('unable to update in users domains table', error);
          });
        }    
    });
 };

const addDomainToday = (domainObjsArray, userId, date) => {
  // map over domainObjsArray
  // create promises for each item

  const promisedDomainObjsArray = domainObjsArray.map((domainObj) => {
    return new Promise((resolve, reject) => {
          return resolve(readOrWriteDomainForUser(userId, domainObj.id, domainObj.totalCount, date))
        })
  })


  const userDomains = Promise.all(promisedDomainObjsArray).then((values) => {
    console.log(values);
  })

  return userDomains;

};


module.exports = addDomainToday;

