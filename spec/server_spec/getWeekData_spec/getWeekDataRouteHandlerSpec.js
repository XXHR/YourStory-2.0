'use strict';

const request = require('request');
const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';

const db = require('../../../db/schema');
const Sequelize = require('sequelize');

describe('getWeekData routehandler', function () {
  describe('GET /', function () {
    it('returns status 200', function (done) {
      request.get(base_url, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /api/weekData', function () {
    it('returns status 200', function (done) {
      request.get(base_url + '/api/weekData', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns an array', function (done) {
      request.get(base_url + '/api/weekData', function (error, response, body) {
        expect(JSON.parse(body)).toBe({});
        done();
      });
    });
  });
});
