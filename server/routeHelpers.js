const postUser = require('./routeHandlers/postUser');
const postHistory = require('./routeHandlers/postHistory');
const getUser = require('./routeHandlers/getUser');
const getCatData = require('./routeHandlers/getCatData');
const getWeekData = require('./routeHandlers/getWeekData');

const db = require('../db/config');

db.authenticate().then(() => {
  console.log('Connection established');
}).catch((err) => {
  console.log('Unable to connect: ', err);
});

module.exports = {
  postUser: postUser,
  getUser: getUser,
  postHistory: postHistory,
  getCatData: getCatData,
  getWeekData: getWeekData,
};
