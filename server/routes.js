const routeHelpers = require('./routeHelpers');

module.exports.router = (app) => {
  app.post('/api/users', routeHelpers.postUser);
  app.get('/api/user', routeHelpers.getUser);
  app.post('/api/history', routeHelpers.postHistory);
};
