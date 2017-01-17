const CryptoJS = require('crypto-js'); // crypto-js npm
const User = require('../../db/schema').User;

module.exports = (req, res) => {
  //find user, send to client
  res.sendStatus(200);
};
