'use strict';

const readHistoryByDate = require('./helpers/readHistoryByDate');

module.exports = (req, res) => {
  const chromeID = req.session.chromeID || '12345';
  const dateRange = req.body.dateRange || 'week';

  readHistoryByDate(chromeID, dateRange)
    .then((finalHistoryByDate) => {
      res.status(200).json(finalHistoryByDate);
    })
    .catch((err) => {
      console.log('Error creating history by date ', err);
      res.sendStatus(404);
    });
};
