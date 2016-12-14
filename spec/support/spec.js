'use strict';

const request = require('request');
const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';

const Sequelize = require('sequelize');
const pg = require('pg');


describe('YourStory App', function () {
  var foo = 0;

  beforeEach(function() {
    foo += 1;
    const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/testyourstory', {
      dialect: 'postgres',
      define: {
        timestamps: false,
      },
      timezone: 'America/Los_Angeles',
    });

  });

  afterEach(function() {
    foo = 0;
  });


  // describe('GET /', function () {
  //   it('returns status 200', function (done) {
  //     request.get(base_url, function (error, response, body) {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  //   });
  // });

  // describe('GET /api/username', function () {
  //   it('returns status 201', function (done) {
  //     request.get(base_url + '/api/username', function (error, response, body) {
  //       expect(response.statusCode).toBe(201);
  //       done();
  //     });
  //   });
  // });

  // describe('GET /api/catData', function () {
  //   it('returns status 201', function (done) {
  //     request.get(base_url + '/api/catData', function (error, response, body) {
  //       if(error) {
  //         console.log("this is the error", error);
  //       }
  //       expect(response.statusCode).toBe(201);        
  //       done();
  //     });
  //   });

  //   it('returns an array', function (done) {
  //     request.get(base_url + '/api/catData', function (error, response, body) {
  //       expect(body.data).toBe([]);
  //       done();
  //     });
  //   });
  // });

  // describe('GET /api/weekData', function () {
  //   it('returns status 201', function (done) {
  //     request.get(base_url + '/api/weekData', function (error, response, body) {
  //       expect(response.statusCode).toBe(201);
  //       done();
  //     });
  //   });

  //   it('returns an array', function (done) {
  //     request.get(base_url + '/api/weekData', function (error, response, body) {
  //       expect(body.data).toBe([]);
  //       done();
  //     });
  //   });
  // });
});
