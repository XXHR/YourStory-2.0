//  require in User model
const User = require('../../db/schema').User;

module.exports = (req, res) => {
  //  attach user's chromeID to session

  req.session.chromeID = req.body.chromeID;

  User.findOrCreate({ where: { chrome_id: req.body.chromeID },
    defaults: { username: req.body.username },
  })
      .spread((user, created) => {
        console.log('USER', user.get({
          plain: true,
        }));
        res.sendStatus(200);
      });
}
