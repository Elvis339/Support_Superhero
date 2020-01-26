require('../../../db/database')
const
    News = require('../../../models/NewsModel');

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

    getNews: async (req, res) => {
        try {
            const news = await News.find({  })

            if (news.length < 1) throw new Error('No news today...')

            res.status(200).send(news)
        } catch (error) {
            let status = error.toString() === 'Error: No news today...' ? 418 :  500;
            message = error.toString() === 'Error: No news today...' ? 'No news today...' : 'Server error...';
            res.status(status).send({
                error: error.stack,
                message,
                status,
            })
        }
    }
}