'use strict';

const request = require('request');
const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';

const db = require('../../../db/schema');
const Sequelize = require('sequelize');

describe('getUser routehandler', function () {
  describe('GET /', function () {
    it('returns status 200', function (done) {
      request.get(base_url, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /api/user', function () {
    it('returns status 200', function (done) {
      request.get(base_url + '/api/user', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});

