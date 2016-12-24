'use strict';

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
