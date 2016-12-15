// 'use strict';

// const request = require('request');
// const base_url = 'http://localhost:3000';
// // const base_url = 'http://yourstory-app.herokuapp.com';

// const db = require('../testSchema');
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


//   // describe('GET /', function () {
//   //   it('returns status 200', function (done) {
//   //     request.get(base_url, function (error, response, body) {
//   //       expect(response.statusCode).toBe(200);
//   //       done();
//   //     });
//   //   });
//   // });

//   // describe('GET /api/username', function () {
//   //   it('returns status 201', function (done) {
//   //     request.get(base_url + '/api/username', function (error, response, body) {
//   //       expect(response.statusCode).toBe(201);
//   //       done();
//   //     });
//   //   });
//   // });

//   // describe('GET /api/catData', function () {
//   //   it('returns status 201', function (done) {
//   //     request.get(base_url + '/api/catData', function (error, response, body) {
//   //       if(error) {
//   //         console.log("this is the error", error);
//   //       }
//   //       expect(response.statusCode).toBe(201);        
//   //       done();
//   //     });
//   //   });

//   //   it('returns an array', function (done) {
//   //     request.get(base_url + '/api/catData', function (error, response, body) {
//   //       expect(body.data).toBe([]);
//   //       done();
//   //     });
//   //   });
//   // });

//   // describe('GET /api/weekData', function () {
//   //   it('returns status 201', function (done) {
//   //     request.get(base_url + '/api/weekData', function (error, response, body) {
//   //       expect(response.statusCode).toBe(201);
//   //       done();
//   //     });
//   //   });

//   //   it('returns an array', function (done) {
//   //     request.get(base_url + '/api/weekData', function (error, response, body) {
//   //       expect(body.data).toBe([]);
//   //       done();
//   //     });
//   //   });
//   // });
// });



'use strict';

const Sequelize = require('sequelize');

const express = require('express');
// const routes = require('../../server/routes');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const app = express();

// app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routes(app);

// const { db } = require('../../db/schema');
const db = require('../testSchema');

describe('create user', function() {
  beforeAll(function(done) {
    setTimeout(function() {
      done();
    }, 4500);
  });

  // const db = db.db;

  beforeAll(function(done) {
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

  beforeEach(function () {
    this.app = app;
    this.dbs = db;
  });

  it('adds a user to user table', function (done) {
    expect(
      this.dbs.User.findOrCreate({ where: { username: 'Melba' } })
      ).toBe('Melba');
    done();
  });

});