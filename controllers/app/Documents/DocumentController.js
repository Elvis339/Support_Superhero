require('../../../db/database')
const
    Document = require('../../../models/DocumentModel');

module.exports = {
    getDocuments: async (req, res) => {
        const documents = null;
        try {
            let query = req.query.filter;
            switch(query) {
                case "shepherd":
                    documents = await Document.find({ category: query });
                    break;
                case "project":
                    documents = await Document.find({ category: query });
                    break;
                case "tasks":
                    documents = await Document.find({ category: query });
                    break;
                case "discussion":
                    documents = await Document.find({ category: query });
                    break;
                case "files":
                    documents = await Document.find({ category: query });
                    break;
                case "notes":
                    documents = await Document.find({ category: query });
                    break;
                case "time":
                    documents = await Document.find({ category: query });
                    break;    
                case "expenses":
                    documents = await Document.find({ category: query });
                    break;
                case "activity":
                    documents = await Document.find({ category: query });
                    break;         
                default:
                    documents = await Document.find({  });
            }
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