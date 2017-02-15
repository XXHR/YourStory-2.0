const pg = require('pg');
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.PRODUCTION_DB_NAME || 'testyourstory', process.env.PRODUCTION_DB_USERNAME || null, process.env.PRODUCTION_DB_PASSWORD || null, {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  timezone: 'America/Los_Angeles',
});

module.exports = db;