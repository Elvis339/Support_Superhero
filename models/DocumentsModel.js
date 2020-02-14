const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'LocalAttachment',
  },
  original_name: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  created_at: {
    default: Date.now,
    type: Number,
  },
  document_id: {
    ref: 'Documents',
    type: mongoose.Schema.Types.ObjectId,
  },
});

const documentsSchema = new mongoose.Schema(
  {
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
        'payments',
      ],
    },
    body: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    files: [filesSchema],
  },
  {
    timestamps: true,
  },
);

const Documents = mongoose.model('Documents', documentsSchema);

module.exports = Documents;
