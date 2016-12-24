'use strict';

// TODO - refactor getUser helper function
// so that it returns the entire user object
// not just the ID so that it's more functional
// change parameter on line 13 to user not userID
// var userID = user.dataValues.id;

const getWeekDataFromDB = require('./helpers/getWeekDataFromDB');

module.exports = (req, res) => {
  const chromeID = req.session.chromeID || '12345';

  getWeekDataFromDB(chromeID)
    .then((finalWeekData) => {
      res.status(200).json(finalWeekData);
    })
    .catch((err) => {
      console.log('Error creating weekData ', err);
      res.sendStatus(404);
    });
};
