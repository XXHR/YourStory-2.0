'use strict';

const User = require('../../db/schema').User;
const Category = require('../../db/schema').Category;
const getUser = require('./helpers/getUser');

module.exports = (req, res) => {
  const chromeID = req.session.chromeID;
  console.log("chromeID from getCatData: ", chromeID);
  // const testID = '12345';

  const promisedUserId = new Promise((resolve, reject) => {
    return resolve(getUser(chromeID));
  });

  const getAllUserDomains = () => {
    return promisedUserId.then((id) => {
      return User.findOne({ where: { id } })
      .then((user) => {
        return user.getDomains()
        .catch((err) => {
          console.log(err);
        });
      });
    })
      .catch((err) => {
        console.log(err);
      });
  };

  let domains = new Promise((resolve, reject) => {
    return resolve(getAllUserDomains());
  });

  const getCategories = () => {
    return Category.findAll()
    .catch((err) => {
      console.log(err);
    });
  };

  const categories = new Promise((resolve, reject) => {
    return resolve(getCategories());
  });

  const getDomArr = () => {
    let domArr = [];
    return domains.then((domains) => {
      for (let i = 0; i < domains.length; i++) {
        let domain = {};
        domain.name = domains[i].dataValues.domain;
        domain.categoryId = domains[i].dataValues.categoryId;
        domain.count = domains[i].dataValues.users_domains.count;
        domArr.push(domain);
      }
      return domArr;
    });
  };

  let domainArr = new Promise((resolve, reject) => {
    return resolve(getDomArr());
  });

  const getCatObj = () => {
    const catObjs = {};
    return categories
           .then((categories) => {
             for (let i = 0; i < categories.length; i++) {
               catObjs[categories[i].dataValues.category] = categories[i].dataValues.id;
             }
             return catObjs;
           });
  };

  let categoryObj = new Promise((resolve, reject) => {
    return resolve(getCatObj());
  });

  let catData = [];

  domainArr
  .then((domArr) => {
    categoryObj
    .then((catObj) => {
      for (let category in catObj) {
        let cat = {};
        cat.id = catObj[category];
        cat.category = category;
        cat.domains = [];
        cat.totalCount = 0;
        catData.push(cat);
      }

       for (let domain of domArr) {
         for (let i = 0; i < catData.length; i++) {
           if (catData[i].id === domain.categoryId) {
             catData[i].domains.push({ label: domain.name, count: domain.count });
             catData[i].totalCount += domain.count;
           }
         }
       }

      res.status(200).send(catData);

    });
  });
};
