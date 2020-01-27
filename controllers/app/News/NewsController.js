require('../../../db/database')
const
    News = require('../../../models/NewsModel'),
    Utils = require('../../../utils');

module.exports = {
    addNews: async (req, res) => {
        const news = new News(req.body)

        try {
            let _new = await news.save()
            res.status(201).send(_new)
        } catch (error) {
            res.status(406).send({
                err: error.toString(),
                message: "Not acceptable",
                status: 406,
            })
        }
    },

    getNewsToday: async (req, res) => {
        try {
            let
                mess = [{
                    created_by: 'No one...',
                    body: 'No news this day...',
                    timestamp: Date(),
                    createdAt: "0000-00-00T00:00:00.000Z"
                }],
                today = Utils.date_now(),
                news = await News.find({ created_on: today }).sort({ createdAt: -1 });

            if (news.length < 1) {
                return res.status(204).send(mess)
            }

            return res.status(200).send(news)
        } catch (error) {
            res.status(500).send({
                error: error.stack,
                message: error.toString(),
                status: 500
            })
        }
    },

    getPreviousNews: async (req, res) => {
        try {
            let
                mess = [{
                    created_by: 'No one...',
                    body: 'No news this day...',
                    timestamp: Date(),
                    createdAt: "0000-00-00T00:00:00.000Z"
                }],
                date = req.params.date,
                news = await News.find({ created_on: date }).sort({ createdAt: -1 });

            if (news.length < 1) {
                return res.status(200).send(mess)
            }

            return res.status(200).send(news)
        } catch (error) {
            res.status(500).send({
                message: error.toString(),
                status: 500,
                error: error.stack
            })
        }
    },

    getNews: async (req, res) => {
        try {
            const news = await News.find({}).sort({ created_on: -1 })

            if (news.length < 1) throw new Error('No news today...')

            res.status(200).send(news)
        } catch (error) {
            let status = error.toString() === 'Error: No news today...' ? 418 : 500;
            message = error.toString() === 'Error: No news today...' ? 'No news today...' : 'Server error...';
            res.status(status).send({
                error: error.stack,
                message,
                status,
            })
        }
    }
}