const 
  users = require('./users/users'),
  documents = require('./documents/documents');

module.exports = (router) => {
  users(router);
  documents(router);

  return router;
};