/* eslint-disable func-names */
const fs = require('fs');

const path = require('path');
const mongoose = require('mongoose');
const { deleteElasticSearchDocument } = require('../services/elasticsearch/Elasticsearch');
const { GET_ROOT_PATH } = require('../utils');

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

const reactionsSchema = new mongoose.Schema(
  {
    reaction: { type: Number },
    description: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  },
);

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
        'my-work',
        'calendar',
        'people',
        'invoices',
        'estimates',
        'timesheet',
        'reports',
        'add-ons',
        'system-settings',
        'self-hosted',
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
    reactions: [reactionsSchema],
  },
  {
    timestamps: true,
  },
);

documentsSchema.statics.deleteDocument = async function (_id, next) {
  try {
    const document = await Documents.findOne({ _id });
    const filePathArray = document.files;
    if (filePathArray.length > 0) {
      const filePaths = filePathArray.map((file) => file.path);
      filePaths.map((filePath) => fs.unlinkSync(path.join(GET_ROOT_PATH('models'), filePath)));
    }
    await Documents.deleteOne({ _id });
    await deleteElasticSearchDocument(_id);
  } catch (error) {
    throw new Error(error);
  }
};

const Documents = mongoose.model('Documents', documentsSchema);

module.exports = Documents;
