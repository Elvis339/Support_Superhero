const
  controller = require('../../../controllers/Webhooks/WebhookController'),
  auth = require('../../../middleware/auth');

module.exports = (router) => {
  router.route('/webhook/slack')
    .post(controller.commandListener) 
};