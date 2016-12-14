const postUser = require('./routes/postUser');

const db = require('../db/config');

db.authenticate().then(() => {
  console.log('Connection established');
}).catch((err) => {
  console.log('Unable to connect: ', err);
});

module.exports = {
  postUser: postUser,
}