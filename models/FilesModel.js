const
    mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    
}, {
    timestamps: true
})

const fileSchema = mongoose.model('fileSchema', fileSchema)

module.exports = fileSchema