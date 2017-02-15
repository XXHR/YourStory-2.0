require('dotenv').config();
const Encrypt = require('crypto-js'); // crypto-js npm
const User = require('../../db/schema').User;

module.exports = (req, res) => {
  console.log("inside get user");
  const chromeID = req.session.chromeID;

  User.findOne({ where: { chromeID } })
  .then((user) => {
    console.log("user from getUser", user);
    let decryptedUser = Encrypt.AES.decrypt(user, process.env.USERNAME);

    if (decryptedUser === null) {
      decryptedUser = 'User';
    }

    console.log("decryptedUser: ", decryptedUser);
    res.status(201).json(decryptedUser);
  })
  .catch((err) => {
    console.log("error sending username", err);
  });
};
