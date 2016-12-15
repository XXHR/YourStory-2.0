'use strict';

const pg = require('pg');
const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/testyourstory', {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  timezone: 'America/Los_Angeles',
});

//establish connection 
db
  .authenticate()
  .then(() => {
    console.log('Connection established from test schema');    
  })
  .catch((err) => {
    console.log('Unable to connect: ', err);
  });


const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chromeID: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: Sequelize.STRING,
});

const Domain = db.define('domain', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  domain: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const UserDomain = db.define('users_domains', {
  count: Sequelize.INTEGER,
  date_added: Sequelize.DATEONLY
});

Domain.belongsToMany(User, { through: UserDomain, foreignKey: 'domainId' });

User.belongsToMany(Domain, { through: UserDomain, foreignKey: 'userId' });


Category.hasMany(Domain, { as: 'Sites' });
Domain.belongsTo(Category);


db
  .sync({ force: false })  
  .then(() => {    
    console.log('All tables created');
  })
  .catch((err) => {
    console.log("error creating tables");
  })

module.exports = {
  User: User,
  Domain: Domain,
  Category: Category,
  UserDomain: UserDomain,
  db: db
};
