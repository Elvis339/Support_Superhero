const 
  users = require('./users/users'),
  documents = require('./documents/documents'),
  activecollab_api = require('./ActiveCollab_API/activecollab_api');

module.exports = (router) => {
  users(router);
  documents(router);
  activecollab_api(router);
  
  return router;
};