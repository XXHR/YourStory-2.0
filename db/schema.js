const Sequelize = require('sequelize');
//require database setup from config
const db = require('./config');

//establish connection 
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

    // User.findOrCreate({ where: { username: 'Natasha' } })
    //     .spread((user, created) => {
    //       if(user) {
    //         Domain.findOrCreate({ where: { domain: 'goodbye.com' } })
    //               .spread((domain, created) => {
    //                 console.log(domain.get({
    //                   plain: true
    //                 }))
    //                 user.addDomain(domain, { count: 100, date_added: new Date() });
    //               })
    //       }
    //     })



    let today = new Date();
    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    let date = year + '-' + month + '-' + day;

    User.findOne({ where: { username: 'Natasha' } })
        .then((user) => {
          user.getDomains()
              .then((domains) => {
                console.log('hulu date added', domains[0].dataValues.users_domains.dataValues.date_added);

                console.log('javascript date: ', date, ' sequelize date: ', domains[0].dataValues.users_domains.dataValues.date_added)

                if(date === domains[0].dataValues.users_domains.dataValues.date_added) {
                  console.log('added today');
                } else {
                  console.log('not a match')
                }

              })
        })
    


  })
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
  UserDomain: UserDomain
}
