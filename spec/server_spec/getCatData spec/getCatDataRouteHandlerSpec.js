'use strict';

const request = require('request');
const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';

const db = require('../../../db/schema');
const Sequelize = require('sequelize');


describe('getCatData routehandler', function () {

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  describe('GET /', function () {
    it('returns status 200', function (done) {
      request.get(base_url, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /api/catData', function () {
    it('returns status 200', function (done) {
      request.get(base_url + '/api/catData', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('returns an array', function (done) {
      request.get(base_url + '/api/catData', function (error, response, body) {
        expect(JSON.parse(body)).toEqual(jasmine.any(Array));
        expect(JSON.parse(body).length).toBeGreaterThan(0);
        done();
      });
    });
    it('returns a list of domains and their categories', function (done) {
      request.get(base_url + '/api/catData', function (error, response, body) {
        expect(JSON.parse(body)[0]).toContain('category') &&
        expect(JSON.parse(body)[0]).toContain('domain');
        done();
      })
    })
  });
});
