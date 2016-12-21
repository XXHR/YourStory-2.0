'use strict';

const request = require('request');
const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';

const db = require('../../../db/schema');
const Sequelize = require('sequelize');


describe('getCatData routehandler', function () {

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
    it('returns an array', function(done) {
      request.get(base_url + '/api/catData', function (error, response, body) {
        expect(body).toEqual(jasmine.any(Array));
        expect(body.length).toBeGreaterThan(0);
        done();
      })
    })
  });
});
