/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const News = require('../../models/NewsModel');
const Utils = require('../../utils');

const error = '';
let message = '';
let status = 0;

module.exports = {
  commandListener: async (req, res) => {
    try {
      const { user_name, command, text } = req.body;

      if (command !== '/support') {
        message = 'Wrong command or channel';
        status = 406;
        return res.status(status).send({
          message,
          status,
        });
      }

      const news = new News({
        created_by: user_name,
        created_on: Utils.date_now(),
        type: 'SlackWebhook',
        body: text,
      });
      await news.save();
      res.status(200).send(text);
    } catch (error) {
      res.status(500).send({
        error: error.stack,
        message: error.toString(),
        status: 500,
      });
    }
  },
};
