const Document = require('../../../models/DocumentsModel');

module.exports = {
  postReaction: async (req, res) => {
    try {
      const query = req.query.id;
      const document = await Document.findOneAndUpdate({ 'files._id': query }, { $push: { reactions: req.body } });
      await document.save();
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
