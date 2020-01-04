const
    mongoose = require('mongoose'),
    config = require('../config');

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

const Document = mongoose.model('Model', modelSchema)

module.exports = Document