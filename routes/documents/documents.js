const controller = require('../../controllers/app/Documents/DocumentsController')
const auth = require('../../middleware/auth');
const { documentsUpload, randomHash } = require('../../utils')


module.exports = (router) => {
  router.route('/documents')
    .get(auth, controller.getDocuments)
    .post(auth, documentsUpload(randomHash).single('sharable_files'), controller.addDocument)

  router.route('/documents/search')
    .get(controller.searchDocuments)
};