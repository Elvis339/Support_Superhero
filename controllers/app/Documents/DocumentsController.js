/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const path = require('path');

const Documents = require('../../../models/DocumentsModel');

const ENV = process.env.NODE_ENV || 'development';
const config = require('../../../config')[ENV];
const { GET_ROOT_PATH } = require('../../../utils');
const {
  addDocumentToElastic,
  searchDocumentElastic,
} = require('../../../services/elasticsearch/Elasticsearch');
const { APP_MODULES } = require('./APP_MODULES.d');

module.exports = {
  countDocuments: async (req, res) => {
    try {
      const count = await Documents.countDocuments({});
      res.status(200).send({
        status: 'OK!',
        documents: count,
      });
    } catch (error) {
      res.status(500).send({
        err: error.toString(),
        message: 'Pinging documents failed',
        status: 500,
      });
    }
  },

  getDocuments: async (req, res) => {
    let documents = null;
    try {
      const query = req.query.filter;
      const limiter = parseInt(req.query.limit, 10);

      for (const _module of APP_MODULES) {
        if (query === _module) {
          if (_module === 'all') {
            documents = await Documents.find({})
              .limit(limiter)
              .sort({ createdAt: -1 });
            return res.status(200).send(documents);
          }
          documents = await Documents.find({ category: _module })
            .limit(limiter)
            .sort({ createdAt: -1 });
          return res.status(200).send(documents);
        }
      }
      throw new Error('Invalid query');
    } catch (error) {
      res.status(404).send({
        error: error.toString(),
        status: 404,
      });
    }
  },

  getDocument: async (req, res) => {
    try {
      const query = req.query.id;
      const documents = await Documents.findById({ _id: query });
      if (!documents) {
        return res.status(404).send({
          error: 'No documents found',
          status: 404,
        });
      }
      return res.status(200).send(documents);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
        message: 'Whooooops something went wrong',
        status: 500,
      });
    }
  },

  getFile: async (req, res) => {
    try {
      const query = req.query.id;
      const file = await Documents.findOne({ 'files._id': query });
      if (!file) {
        return res.status(404).send({
          error: 'No file found',
          status: 404,
        });
      }
      return res.status(200).send(file.files);
    } catch (error) {
      res.status(404).send({
        error: error.toString(),
        message: 'Couldn`t get file...',
        status: 404,
      });
    }
  },

  addDocument: async (req, res) => {
    let document = null;
    const {
      title, category, body, created_by,
    } = req.body;

    // eslint-disable-next-line radix
    if (parseInt(req.body.hasFiles) === 1) {
      const {
        originalname, mimetype, path, size,
      } = req.file;
      document = new Documents({
        title,
        category,
        body,
        created_by,
        files: [
          {
            original_name: originalname,
            mimetype,
            path: path.split(config.file_path_name)[1],
            size,
          },
        ],
      });
    } else {
      document = new Documents({
        title,
        category,
        body,
        created_by,
      });
    }
    // Allow to add larger documents
    document.db.db
      .admin()
      .command({ setParameter: 1, failIndexKeyTooLong: false });
    try {
      const doc = await document.save();

      const elastic = {
        docId: doc.id,
        title,
        body,
        category,
      };

      await addDocumentToElastic(elastic);
      res.status(201).send(doc);
    } catch (error) {
      res.status(406).send({
        err: error.toString(),
        message: 'Not acceptable',
        status: 406,
      });
    }
  },

  deleteDocument: async (req, res) => {
    try {
      const { query } = req;
      const document = Documents.deleteDocument(query.id);
      res.status(200).send(document);
    } catch (error) {
      res.status(500).send({
        err: error.toString(),
        message: 'Delete document error',
        status: 500,
      });
    }
  },

  searchDocuments: async (req, res) => {
    try {
      const { query } = req;
      const result = await searchDocumentElastic(query.q);
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        err: error.toString(),
        message: 'Search unexpected error',
        status: 500,
      });
    }
  },
};
