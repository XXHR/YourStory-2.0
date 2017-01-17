'use strict';

const readHistoryByDate = require('./helpers/readHistoryByDate');

module.exports = (req, res) => {
  const chromeID = '12345';
  const dateRange = req.body.dateRange || { startDate: 16, month: 1, endDate: 28, year: 2017 };

  readHistoryByDate(chromeID, dateRange)
    .then((finalHistoryByDate) => {
      res.status(200).json(finalHistoryByDate);
    })
    .catch((err) => {
      console.log('Error creating history by date ', err);
      res.sendStatus(404);
    });
};
