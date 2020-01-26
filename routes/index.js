const 
  users = require('./users/users'),
  documents = require('./documents/documents'),
  news = require('./news/news'),
  activecollab_api = require('./ActiveCollab_API/activecollab_api');

module.exports = (router) => {
  users(router);
  documents(router);
  news(router);
  activecollab_api(router);
  
  return router;
};