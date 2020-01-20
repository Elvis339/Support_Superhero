const
    mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

const Document = mongoose.model('Model', modelSchema)

module.exports = Document