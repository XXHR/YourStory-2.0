const Sequelize = require('sequelize');
// require database setup from config
const db = require('./config');

// establish connection
db
  .authenticate()
  .then(() => {
    console.log('Connection established from schema');
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
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  count: Sequelize.INTEGER,
  date_added: Sequelize.DATEONLY,
});

Domain.belongsToMany(User, { through: { model: UserDomain, unique: false } });

User.belongsToMany(Domain, { through: { model: UserDomain, unique: false } });


Category.hasMany(Domain, { as: 'Sites' });
Domain.belongsTo(Category);

// set sync force: true to drop tables every time (ie. while testing)
db
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate([
      { username: 'Natasha', chromeID: '12345' },
      { username: 'Melba', chromeID: '67890' },
    ])
    .then(() => {
      console.log('User Table created');
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .then(() => {
    return Category.bulkCreate([
      { id: 1, category: 'Search' },
      { id: 2, category: 'Review' },
      { id: 3, category: 'Socials' },
      { id: 4, category: 'News' },
    ])
    .then(() => {
      console.log('category table created');
    })
    .catch((err) => {
      console.log('error creating Category table', err);
    })
  })
  .then(() => {
    return Domain.bulkCreate([
      { domain: 'google.com', userId: 1, categoryId: 1 },
      { domain: 'yelp.com', userId: 1, categoryId: 2 },
      { domain: 'facebook.com', userId: 1, categoryId: 3 },
      { domain: 'wsj.com', userId: 1, categoryId: 4 },
    ])
    .then(() => {
      console.log('Domain Table created');
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .then(() => {
    UserDomain.bulkCreate([
      { domainId: 1, count: 140, userId: 1, date_added: '12-17-2016' },
      { domainId: 2, count: 14, userId: 1, date_added: '12-17-2016' },
      { domainId: 3, count: 24, userId: 1, date_added: '12-17-2016' },
      { domainId: 4, count: 150, userId: 1, date_added: '12-17-2016' },
      { domainId: 1, count: 140, userId: 1, date_added: '12-18-2016' },
      { domainId: 2, count: 14, userId: 1, date_added: '12-18-2016' },
      { domainId: 3, count: 24, userId: 1, date_added: '12-18-2016' },
      { domainId: 4, count: 150, userId: 1, date_added: '12-18-2016' },
      { domainId: 1, count: 140, userId: 1, date_added: '12-19-2016' },
      { domainId: 2, count: 14, userId: 1, date_added: '12-19-2016' },
      { domainId: 3, count: 24, userId: 1, date_added: '12-19-2016' },
      { domainId: 4, count: 150, userId: 1, date_added: '12-19-2016' },
    ])
    .then(() => {
      console.log('UserDomain Table created');
    })
    .catch((err) => {
      console.log('error creating UserDomain table', err);
    });
  })
  .then(() => {
    console.log('All tables created');
  })
  .catch((err) => {
    console.log('error creating tables', err);
  });

module.exports = {
  User: User,
  Domain: Domain,
  Category: Category,
  UserDomain: UserDomain
};
