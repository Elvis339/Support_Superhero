const 
    mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
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
            'SlackWebhook',
            'CrispWebhook',
            'HelpScoutWebhook'
        ],
    }
}, {
    timestamps: true
})

const Notifications = mongoose.model('Notifications', notificationsSchema)

module.exports = Notifications