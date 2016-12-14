const routeHelpers = require('./routeHelpers');

module.exports.router = (app) => {
  app.post('/api/users', routeHelpers.postUser);
  app.post('/api/history', routeHelpers.postHistory)
};
