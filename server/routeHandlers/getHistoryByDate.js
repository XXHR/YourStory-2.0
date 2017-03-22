'use strict';

const readHistoryByDate = require('./helpers/readHistoryByDate');

module.exports = (req, res) => {

  const chromeID = req.body.chromeID || req.session.chromeID;
  const dateRange = req.body.dateRange;

  readHistoryByDate(chromeID, dateRange)
    .then((finalHistoryByDate) => {
      // console.log('finalHistoryByDate: ', finalHistoryByDate);
      res.status(200).json(finalHistoryByDate);
    })
    .catch((err) => {
      console.log('Error creating history by date ', err);
      res.sendStatus(404);
    });
};
