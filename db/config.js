'use strict';

//  instantiate new sequelize database
const pg = require('pg');
const Sequelize = require('sequelize');

//'postgres://localhost/testyourstory'
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/testyourstory', {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  timezone: 'America/Los_Angeles',
});

module.exports = db;
