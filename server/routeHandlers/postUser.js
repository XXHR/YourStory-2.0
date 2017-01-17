'use strict';

const CryptoJS = require('crypto-js'); // crypto-js npm
const User = require('../../db/schema').User;

module.exports = (req, res) => {
  //  attach user's encrypted chromeID to session
  req.session.chromeID = CryptoJS.SHA256(req.body.chromeID).toString(CryptoJS.enc.Base64);
  console.log("chromeID from postUser: ", req.session.chromeID);


  User.findOrCreate({ where: { chromeID: req.session.chromeID },
    defaults: { username: req.body.username },
  })
      .spread((user, created) => {
        console.log('USER', user.get({
          plain: true,
        }));
        res.status(200).json(req.session.chromeID);
      });
};
