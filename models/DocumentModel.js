const
    mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true, 
    },
    body: {
        type: String,
        required: true, 
        trim: true
    },
    created_by: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
})

const Document = mongoose.model('Model', modelSchema)

module.exports = Document