const controller = require('../../../modules/Slack/Slack');
const { isDevelopmentMode } = require('../../../utils');

module.exports = (router) => {
  router.route('/webhook/slack').post(controller.commandListener);

  if (isDevelopmentMode) {
    router.route('/webhook/test').post(controller.webhookTest);
  }
};
