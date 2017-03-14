'use strict';

const readHistoryByDate = require('./helpers/readHistoryByDate');

module.exports = (req, res) => {

  console.log('DATES FROM CLIENT', req.body.dateRange.payload);

  const chromeID = req.session.chromeID || 'DPf6HkUP8DdlqQQfbb7flgP8Myo=';
  const dateRange = req.body.dateRange.payload;

  readHistoryByDate(chromeID, dateRange)
    .then((finalHistoryByDate) => {
      res.status(200).json(finalHistoryByDate);
    })
    .catch((err) => {
      console.log('Error creating history by date ', err);
      res.sendStatus(404);
    });
};
