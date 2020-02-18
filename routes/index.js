/* eslint-disable camelcase */
const users = require('./users/users');
const documents = require('./documents/documents');
const news = require('./news/news');
const reactions = require('./reactions/reactions');
const activecollab_api = require('./ActiveCollab_API/activecollab_api');
const slackWebhook = require('./webhooks/Slack/slack');

module.exports = (router) => {
  users(router);
  documents(router);
  news(router);
  reactions(router);
  activecollab_api(router);
  slackWebhook(router);

  return router;
};
