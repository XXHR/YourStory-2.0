'use strict';

const request = require('request');

const base_url = 'http://localhost:3000';
// const base_url = 'http://yourstory-app.herokuapp.com';

const mapDomainIdsArrayToWeekDataObject = require('../../../server/routeHandlers/helpers/mapDomainIdsArrayToWeekDataObject');

const dummyDataFromSchemaSeedScript = '{"google.com":[{"date":"2016-12-17T08:00:00.000Z","count":140},{"date":"2016-12-18T08:00:00.000Z","count":140},{"date":"2016-12-19T08:00:00.000Z","count":140},{"date":"2016-12-20T08:00:00.000Z","count":140}],"yelp.com":[{"date":"2016-12-17T08:00:00.000Z","count":14},{"date":"2016-12-18T08:00:00.000Z","count":14},{"date":"2016-12-19T08:00:00.000Z","count":14},{"date":"2016-12-20T08:00:00.000Z","count":14}],"facebook.com":[{"date":"2016-12-17T08:00:00.000Z","count":24},{"date":"2016-12-18T08:00:00.000Z","count":24},{"date":"2016-12-19T08:00:00.000Z","count":24},{"date":"2016-12-20T08:00:00.000Z","count":24}],"wsj.com":[{"date":"2016-12-17T08:00:00.000Z","count":150},{"date":"2016-12-18T08:00:00.000Z","count":150},{"date":"2016-12-19T08:00:00.000Z","count":150},{"date":"2016-12-20T08:00:00.000Z","count":150}]}';
const dummyDomainIdArray = [
  { dataValues: { id: 21,
                  count: 140,
                  date_added: '2016-12-17T08:00:00.000Z',
                  domainId: 1,
                  userId: 1 }
  },
  { dataValues: { id: 22,
                  count: 140,
                  date_added: '2016-12-17T08:00:00.000Z',
                  domainId: 2,
                  userId: 1 }
  },
  { dataValues: { id: 23,
                  count: 140,
                  date_added: '2016-12-18T08:00:00.000Z',
                  domainId: 1,
                  userId: 1 }
  }];

const dummyDomainIdObject = {
  1: [{date: '2016-12-17T08:00:00.000Z', count: 140}, {date: '2016-12-17T08:00:00.000Z', count: 140}],
  2: [{date: '2016-12-17T08:00:00.000Z', count: 140}],
};

describe('getWeekData routehandler', function () {
  describe('weekData declarative functions', function() {
    it('returns an object with domain keys and array values', function(done) {
      expect(JSON.stringify(mapDomainIdsArrayToWeekDataObject(dummyDomainIdArray))).toBe(JSON.stringify(dummyDomainIdObject));
      done();
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
        expect(body).toBe(dummyDataFromSchemaSeedScript);
        done();
      });
    });
  });
});
