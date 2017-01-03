'use strict';

const readWeekData = require('./helpers/readWeekData');

module.exports = (req, res) => {
  const chromeID = req.session.chromeID || '12345';

  readWeekData(chromeID)
    .then((finalWeekData) => {
      res.status(200).json(finalWeekData);
    })
    .catch((err) => {
      console.log('Error creating weekData ', err);
      res.sendStatus(404);
    });
};
