const controller = require('../../../modules/Slack/Slack');

module.exports = (router) => {
  router.route('/webhook/slack').post(controller.commandListener);
};
