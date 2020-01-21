require('../../../db/database')
const
    Document = require('../../../models/DocumentModel');

module.exports = {
    getDocuments: async (req, res) => {
        try {
            const documents = await Document.find({  });
            if (documents.length <= 0) throw new Error('No documents found')
            res.status(200).send(documents)
        } catch (error) {
            res.status(404).send({
                error: error.toString(),
                status: 404
            })
        }
    },

    addDocument: async (req, res) => {
        const document = new Document(req.body)

        try {
            let doc = await document.save()
            res.status(201).send(doc)
        } catch (error) {
            res.status(406).send({
                err: error.toString(),
                message: "Not acceptable",
                status: 406,
            })
        }
    },
}