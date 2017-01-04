const User = require('../../db/schema').User;

module.exports.getVisData = (req, res) => {
  const chromeID = req.session.chromeID || '12345';
  User.findOne({ where: { chromeID: chromeID } })
  .then((user) => {
    user.getDomains()
    .then((domains) => {
      let visData = {};
      for (let domain of domains) {
        if (visData[domain.dataValues.domain]) {
          visData[domain.dataValues.domain] += domain.dataValues.users_domains.count;
        } else {
          visData[domain.dataValues.domain] = domain.dataValues.users_domains.count;
        }
      }
      console.log('vis data', visData);
      res.status(200).json(visData);
    })
    .catch((err) => {
      console.log('error fetching user domains', err);
    })
  })
}