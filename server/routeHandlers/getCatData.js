const Category = require('../../db/schema').Category;
const Domain = require('../../db/schema').Domain;
const getUser = require('./helpers/getUser');

module.exports = (req, res) => {

  // const chromeID = req.session.chromeID;
  const testID = '12345'

  const promisedUserId = new Promise((resolve, reject) => {
    return resolve(getUser(testID));
  });

  const getAllUserDomains = () => {
    promisedUserId
    .then((user) => {
      return user.getDomains();
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

  let categories = new Promise((resolve, reject) => {
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
}

  let domainArr = new Promise((resolve, reject) => {
    return resolve(getDomArr());
  });

  const getCatObj = () => {
    let catObjs = {};
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
        cat['id'] = catObj[category];
        cat['category'] = category;
        cat['domains'] = [];
        cat['totalCount'] = 0;
        catData.push(cat);
       }


       for (let domain of domArr) {
         for (let i = 0; i < catData.length; i++) {
           console.log('domain inside domArr: ', domain);
           if (catData[i].id === domain.categoryId) {
            // catData[i].domains.push(domain.name);
             catData[i].domains.push({ label: domain.name, count: domain.count });
             catData[i].totalCount += domain.count;
           }
         }
       }

       res.send(200, catData);
    });
  });
}
