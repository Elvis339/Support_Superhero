const
  controller = require('../../controllers/app/News/NewsController'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/news')
    .post(controller.addNews)
    .get(controller.getNews)

  router.route('/news/today')
    .get(controller.getNewsToday)

  router.route('/news/today/:date')
    .get(controller.getPreviousNews)
};