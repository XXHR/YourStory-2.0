// example spec that connects to db

'use strict';

const Sequelize = require('sequelize');
const db = require('./sample-schema');

describe('example database query test', function () {
  beforeEach(function (done) {
    db.db
     .authenticate()
     .then(function (err) {
       console.log('Connection established from Jasmine spec.js');
       done();
     })
     .catch(function (err) {
       console.error.bind(console, 'Connection error from Jasmine spec.js ');
     });
  });

  it('adds a user to user table', function (done) {
    db.User
    .findOrCreate({ where: { username: 'Adele' } }).then((user) => {
      expect(user[0].dataValues.username).toBe('Adele');
      done();
    });
  });
});
