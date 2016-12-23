'use strict';

const request = require('request');
const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';
const Domain = require('../../../db/schema').Domain;

const db = require('../../../db/schema').db;
const Sequelize = require('sequelize');
const dummyDataIn = '{"google.com":[{"date":"2016-12-16T08:00:00.000Z","count":140},{"date":"2016-12-17T08:00:00.000Z","count":140},{"date":"2016-12-18T08:00:00.000Z","count":140},{"date":"2016-12-19T08:00:00.000Z","count":140},{"date":"2016-12-20T08:00:00.000Z","count":140}],"yelp.com":[{"date":"2016-12-16T08:00:00.000Z","count":14},{"date":"2016-12-17T08:00:00.000Z","count":14},{"date":"2016-12-18T08:00:00.000Z","count":14},{"date":"2016-12-19T08:00:00.000Z","count":14},{"date":"2016-12-20T08:00:00.000Z","count":14}],"facebook.com":[{"date":"2016-12-16T08:00:00.000Z","count":24},{"date":"2016-12-17T08:00:00.000Z","count":24},{"date":"2016-12-18T08:00:00.000Z","count":24},{"date":"2016-12-19T08:00:00.000Z","count":24},{"date":"2016-12-20T08:00:00.000Z","count":24}],"wsj.com":[{"date":"2016-12-16T08:00:00.000Z","count":150},{"date":"2016-12-17T08:00:00.000Z","count":150},{"date":"2016-12-18T08:00:00.000Z","count":150},{"date":"2016-12-19T08:00:00.000Z","count":150},{"date":"2016-12-20T08:00:00.000Z","count":150}]}';

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

    it('returns an object', function (done) {
      request.get(base_url + '/api/weekData', function (error, response, body) {
        expect(body).toBe(dummyData);
        done();
      });
    });
  });
});
