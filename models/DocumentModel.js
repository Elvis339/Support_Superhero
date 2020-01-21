const
    mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        enum: [
            'shepherd',
            'project',
            'task',
            'discussion',
            'notes',
            'expenses',
            'activity',
            'payments'
        ],
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    files: [
        Buffer
    ]
}, {
    timestamps: true
})

const Document = mongoose.model('Model', modelSchema)

module.exports = Document