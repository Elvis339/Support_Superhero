require('../../../db/database')
const
    Documents = require('../../../models/DocumentsModel'),
    { addDocumentToElastic, searchDocumentElastic } = require('../../../services/elasticsearch/Elasticsearch');

const APP_MODULES = [
    'all',
    'shepherd',
    'project',
    'task',
    'discussion',
    'notes',
    'expenses',
    'activity',
    'payments'
]
module.exports = {
    getDocuments: async (req, res) => {
        let documents = null;
        try {
            let query = req.query.filter;
            for(let _module of APP_MODULES) {
                if (query === _module) {
                    if (_module === 'all') {
                        documents = await Documents.find({ }).limit(10).sort({ createdAt: -1 });
                        return res.status(200).send(documents)
                    }
                    documents = await Documents.find({ category: _module }).limit(10).sort({ createdAt: -1 });
                    return res.status(200).send(documents)
                }
            }
            // Change to appropriate error
            throw new Error('Invalid query.')
        } catch (error) {
            res.status(404).send({
                error: error.toString(),
                status: 404
            })
        }
    },

    addDocument: async (req, res) => {
        const document = new Documents(req.body)
        // Allow to add larger documents 
        document.db.db.admin().command({ setParameter: 1, failIndexKeyTooLong: false })
        try {
            await addDocumentToElastic(req.body)
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

    searchDocuments: async (req, res) => {
        try {
            let query = req.query
            let result = await searchDocumentElastic(query.title)
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send({
                error: error.toString()
            })
        }
    }
}