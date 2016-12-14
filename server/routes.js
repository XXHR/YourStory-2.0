const routeHelpers = require('./routehelpers');

module.exports.router = (app) => {
  app.post('/api/users', routeHelpers.postUser)
}
