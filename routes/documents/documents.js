const 
  controller = require('../../controllers/app/Documents/DocumentController'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/document')
    .post()
};