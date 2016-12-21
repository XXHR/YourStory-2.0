// example spec that connects to db

'use strict';

const Sequelize = require('sequelize');
const db = require('./sample-schema').db;
const User = require('./sample-schema').User;
const Domain = require('./sample-schema').Domain;
const UserDomain = require('./sample-schema').UserDomain;
const Category = require('./sample-schema').Category;

describe('example database query test', function () {
  beforeEach(function (done) {
    db
      .authenticate()
       .then(function (err) {
         console.log('Connection established from Jasmine spec.js');
         done();
       })
       .catch(function (err) {
         console.error.bind(console, 'Connection error from Jasmine spec.js ');
       })
      .sync({ force: true})
      // .then(() => {
      //   return User.bulkCreate([
      //     { username: 'Natasha' },
      //     { username: 'Melba' },
      //   ])
      //   .then(() => {
      //     console.log('User Table created');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // })
      // .then(() => {
      //   return Domain.bulkCreate([
      //     { domain: 'google.com', userId: 1 },
      //     { domain: 'yelp.com', userId: 1 },
      //     { domain: 'facebook.com', userId: 1 },
      //     { domain: 'wsj.com', userId: 1 },
      //   ])
      //   .then(() => {
      //     console.log('Domain Table created');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // })
      // .then(() => {
      //   UserDomain.bulkCreate([
      //     { domainId: 1, count: 140, userId: 1, date_added: '12-17-2016' },
      //     { domainId: 2, count: 14, userId: 1, date_added: '12-17-2016' },
      //     { domainId: 3, count: 24, userId: 1, date_added: '12-17-2016' },
      //     { domainId: 4, count: 150, userId: 1, date_added: '12-17-2016' },
      //     { domainId: 1, count: 140, userId: 1, date_added: '12-18-2016' },
      //     { domainId: 2, count: 14, userId: 1, date_added: '12-18-2016' },
      //     { domainId: 3, count: 24, userId: 1, date_added: '12-18-2016' },
      //     { domainId: 4, count: 150, userId: 1, date_added: '12-18-2016' },
      //     { domainId: 1, count: 140, userId: 1, date_added: '12-19-2016' },
      //     { domainId: 2, count: 14, userId: 1, date_added: '12-19-2016' },
      //     { domainId: 3, count: 24, userId: 1, date_added: '12-19-2016' },
      //     { domainId: 4, count: 150, userId: 1, date_added: '12-19-2016' },
      //   ])
      //   .then(() => {
      //     console.log('UserDomain Table created');
      //   })
      //   .catch((err) => {
      //     console.log('error creating UserDomain table', err);
      //   });
      // })
      .then(() => {
        console.log('All tables created');
      })
      .catch((err) => {
        console.log("error creating tables");
      });
  });
});
