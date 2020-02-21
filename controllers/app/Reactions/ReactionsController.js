/* eslint-disable consistent-return */
const Document = require('../../../models/DocumentsModel');

module.exports = {
  postReaction: async (req, res) => {
    try {
      const query = req.query.id;
      await Document.updateOne({ 'files._id': query }, { $push: { reactions: req.body } });
      return res.status(201).send();
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
        status: 500,
        message: 'Failed to submit reaction...',
      });
    }
  },

  getReactions: async (req, res) => {
    try {
      const documents = await Document.find({
        reactions: { $exists: true, $not: { $size: 0 } },
      });
      if (documents.length < 1) {
        return res.status(204).send();
      }
      const reactions = documents.map((document) => document.reactions).flat();
      return res.status(200).send(reactions);
    } catch (error) {
      res.status(500).send({
        message: 'Something went wrong...',
        error: error.toString(),
        status: 500,
      });
    }
  },
};
