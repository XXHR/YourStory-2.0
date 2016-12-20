// 'use strict';

// const request = require('request');
// const base_url = 'http://localhost:3000';
// // const base_url = 'http://yourstory-app.herokuapp.com';

// const db = require('./test-schema');
// const Sequelize = require('sequelize');

// describe('YourStory App', function () {
//   var foo = 0;

//   beforeEach(function () {
//     foo += 1;
//     this.db = db.db
//      .authenticate()
//      .then(function (err) {
//        console.log('Connection established jasmine');
//        done();
//      })
//      .catch(function (err) {
//        console.error.bind(console, 'Sequelize connection error: ');
//      });
//   });

//   afterEach(function() {
//     foo = 0;
//   });

//   describe('create user', function() {
//     it('adds a user to user table', function (done) {
//       expect(
//         db.User.findOrCreate({ where: { username: 'Melba' } })
//         ).toBe('Melba');
//       done();
//     });
//   });
// });






// 'use strict';

// const Sequelize = require('sequelize');
// const db = require('./sample-schema');

// describe('database queries', function () {
//   beforeEach(function (done) {
//     db.db
//      .authenticate()
//      .then(function (err) {
//        console.log('Connection established from Jasmine spec.js');
//        done();
//      })
//      .catch(function (err) {
//        console.error.bind(console, 'Connection error from Jasmine spec.js ');
//      });
//   });

//   it('adds a user to user table', function (done) {
//     db.User
//     .findOrCreate({ where: { username: 'Adele' } }).then((user) => {
//       expect(user[0].dataValues.username).toBe('Adele');
//       done();
//     });
//   });
// });
