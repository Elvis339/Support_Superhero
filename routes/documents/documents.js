const 
  controller = require('../../controllers/app/Documents/DocumentsController'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/documents')
    .get(auth, controller.getDocuments)
    .post(auth, controller.addDocument)
};