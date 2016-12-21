// *** use path dirname here?? ***
const User = require('../../../db/schema').User;


const getUser = (chromeID) => {
  return User.findOne({ where: { chromeID: chromeID } })
  .then((user) => {
    return user.dataValues.id;
  })
  .catch((err) => {
      console.log('error getting userId from Users: ', err);
  });
};


module.exports = getUser;
