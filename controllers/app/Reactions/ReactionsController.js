const Document = require('../../../models/DocumentsModel');

module.exports = {
  postReaction: async (req, res) => {
    try {
      const query = req.query.id;
      await Document.updateOne({ 'files._id': query }, { $push: { reactions: req.body } });
      res.status(201).send();
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
        status: 500,
        message: 'Failed to submit reaction...',
      });
    }
  },
};
