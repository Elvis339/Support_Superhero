const Documents = require('../../../models/DocumentsModel')
const { addDocumentToElastic, searchDocumentElastic } = require('../../../services/elasticsearch/Elasticsearch');
const { APP_MODULES } = require('./APP_MODULES.d')

module.exports = {
    getDocuments: async (req, res) => {
        let documents = null;
        try {
            let query = req.query.filter;
            for (let _module of APP_MODULES) {
                if (query === _module) {
                    if (_module === 'all') {
                        documents = await Documents.find({}).limit(10).sort({ createdAt: -1 });
                        return res.status(200).send(documents)
                    }
                    documents = await Documents.find({ category: _module }).limit(10).sort({ createdAt: -1 });
                    return res.status(200).send(documents)
                }
            }
            // Change to appropriate error
            throw new Error('Invalid query')
        } catch (error) {
            res.status(404).send({
                error: error.toString(),
                status: 404
            })
        }
    },

    addDocument: async (req, res) => {
        let document = null
        const { title, category, body, created_by } = req.body

        if (parseInt(req.body.hasFiles) === 1) {
            const { originalname, mimetype, path, size } = req.file
            document = new Documents({
                title,
                category,
                body,
                created_by,
                files: [{
                    original_name: originalname,
                    mimetype,
                    path,
                    size
                }]
            })
        } else {
            document = new Documents({
                title,
                category,
                body,
                created_by,
            })
        }
        // Allow to add larger documents 
        document.db.db.admin().command({ setParameter: 1, failIndexKeyTooLong: false })
        try {
            const { title, body, category } = req.body
            let elastic = {
                title,
                body,
                category
            }
            await addDocumentToElastic(elastic)
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
            let result = await searchDocumentElastic(query.q)
            res.status(200).send(result)
        } catch (error) {
            res.status(404).send({
                err: error.toString(),
                message: "Not found",
                status: 404,
            })
        }
    }
}