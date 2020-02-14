/* eslint-disable func-names */
const mongoose = require('mongoose');
const emitter = require('../controllers/events/Event');

const saveEmitter = emitter.myEmitter;
const NotificationsController = require('../controllers/app/Notifications/NotificationsController');

const newsSchema = new mongoose.Schema(
  {
    created_by: {
      type: String,
      required: true,
    },
    created_on: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['App', 'SlackWebhook', 'CrispWebhook', 'HelpScoutWebhook'],
      default: 'App',
    },
    body: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

newsSchema.pre('save', async function (next) {
  const news = this;

  newsSchema.path('type').enumValues.map((value) => {
    if (news.type === value) {
      const notification = {
        created_by: news.created_by,
        created_on: news.created_on,
        type: value,
      };
      saveEmitter.emit(value, NotificationsController.onDBSave(notification));
    }
  });

  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
