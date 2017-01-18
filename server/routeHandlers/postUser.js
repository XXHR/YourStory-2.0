'use strict';

require('dotenv').config();
const Encrypt = require('crypto-js'); // crypto-js npm
const User = require('../../db/schema').User;

module.exports = (req, res) => {
  console.log("process.env.CI: ", process.env.CI);
  console.log("req from client: ", req.body.chromeID);

  //  attach user's encrypted chromeID to session
  const chromeID = Encrypt.HmacSHA1(req.body.chromeID, process.env.CI).toString(Encrypt.enc.Base64);
  req.session.chromeID = chromeID;
  const username = Encrypt.AES.encrypt(req.body.username, process.env.USERNAME);
  console.log("encrypted username: ", username);
  let decryptedUser = Encrypt.AES.decrypt(username, process.env.USERNAME).toString(Encrypt.enc.Base64);
  
  console.log("decryptedUser: ", decryptedUser);


  User.findOrCreate({ where: { chromeID },
    defaults: { username },
  })
  .then(() => {
    res.status(200).json(chromeID);
  })
  .catch((error) => {
    console.log(error);
  });
};
