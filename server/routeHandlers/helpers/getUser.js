// *** use path dirname here?? ***
const User = require('../../../db/schema').User;


const getUser = () => {
  return User.findOne({ where: { chromeID: chromeID() } })
  .then((user) => {
    return user.dataValues.id;
  })
  .catch((err) => {
      console.log('error getting userId from Users: ', err);
  });
};

const promisedUserId = new Promise((resolve, reject) => {
  return resolve(getUser());
});

module.exports = promisedUserId;
