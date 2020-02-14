const News = require('../../../models/NewsModel');
const Utils = require('../../../utils');

module.exports = {
  addNews: async (req, res) => {
    const news = new News(req.body);

    try {
      const _new = await news.save();
      res.status(201).send(_new);
    } catch (error) {
      res.status(406).send({
        err: error.toString(),
        message: "Not acceptable",
        status: 406
      });
    }
  },

  getNewsToday: async (req, res) => {
    try {
      const mess = [{
        created_by: 'No one...',
        body: 'No news this day...',
        timestamp: Date(),
        createdAt: '0000-00-00T00:00:00.000Z',
      }];
      const today = Utils.date_now();
      const news = await News.find({ created_on: today }).limit(5).sort({ createdAt: -1 });

      if (news.length < 1) {
        return res.status(206).send(mess);
      }

      return res.status(200).send(news);
    } catch (error) {
      res.status(500).send({
        error: error.stack,
        message: error.toString(),
        status: 500
      });
    }
  },

  getPreviousNews: async (req, res) => {
    try {
      const mess = [{
        created_by: 'No one...',
        body: 'No news this day...',
        timestamp: Date(),
        createdAt: '0000-00-00T00:00:00.000Z',
      }];
      const { date } = req.params;
      const news = await News.find({ created_on: date }).limit(5).sort({ createdAt: -1 });

      if (news.length < 1) {
        return res.status(206).send(mess);
      }

      return res.status(200).send(news);
    } catch (error) {
      res.status(500).send({
        message: error.toString(),
        status: 500,
        error: error.stack
      });
    }
  },
};
