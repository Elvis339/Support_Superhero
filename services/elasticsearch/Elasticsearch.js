'use strict'
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    node: 'http://localhost:9200'
})

module.exports = {
    elastic: client,

    addDocumentToElastic: async payload => {
        try {
            return await client.index({
                index: 'documents',
                body: payload
            })
        } catch (error) {
            throw new Error('Failed to index document ' + error.toString())
        }
    },

    searchDocumentElastic: async (titleQuery) => {
        try {
            const result = await client.search({
                index: 'documents',
                body: {
                    query: {
                        multi_match: {
                            query: titleQuery,
                            fields: ['title', 'category'],
                            fuzziness: 2
                        }
                    }
                }
            })
            if (result.statusCode === 200) {
                return result.body.hits.hits
            }
            throw new Error('Search went doouuuwnn..')
        } catch (error) {
            throw new Error(error)
        }
    }
}
