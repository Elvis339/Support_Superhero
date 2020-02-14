const controller = require('../../controllers/app/News/NewsController');
const auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/news').post(controller.addNews);

  router.route('/news/today').get(auth, controller.getNewsToday);

  router.route('/news/today/:date').get(auth, controller.getPreviousNews);
};
