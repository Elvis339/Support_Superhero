const
  controller = require('../../controllers/app/News/NewsController'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  // Add news
  router.route('/news')
    .post(controller.addNews)
    .get(controller.getNews)
};