const controller = require('../../controllers/app/Reactions/ReactionsController');

module.exports = (router) => {
  router.route('/reactions').post(controller.postReaction);
};
