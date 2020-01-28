const
    mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
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
        enum: [
            'App',
            'SlackWebhook',
            'CrispWebhook',
            'HelpScoutWebhook'
        ],
    },
    body: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
})

const News = mongoose.model('News', newsSchema)

module.exports = News