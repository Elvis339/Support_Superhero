const
    mongoose = require('mongoose');

const documentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        lowercase: true,
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
    },
    body: {
        type: String,
        required: true,
        trim: true,
        // unique: true,
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

const Documents = mongoose.model('Documents', documentsSchema)

module.exports = Documents