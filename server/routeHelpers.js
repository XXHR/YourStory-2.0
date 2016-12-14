const postUser = require('./routeHandlers/postUser');
const postHistory = require('./routeHandlers/postHistory');


const db = require('../db/config');

db.authenticate().then(() => {
  console.log('Connection established');
}).catch((err) => {
  console.log('Unable to connect: ', err);
});

module.exports = {
  postUser: postUser,

  postHistory: postHistory,
}