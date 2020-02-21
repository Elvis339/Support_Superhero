const controller = require('../../controllers/app/Reactions/ReactionsController');
const auth = require('../../middleware/auth');

module.exports = (router) => {
  router
    .route('/reactions')
    .get(auth, controller.getReactions)
    .post(auth, controller.postReaction);
};
