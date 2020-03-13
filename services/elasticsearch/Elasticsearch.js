
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200',
});

module.exports = {
  elastic: client,

  addDocumentToElastic: async (payload) => {
    try {
      return await client.index({
        index: 'documents',
        body: payload,
      });
    } catch (error) {
      throw new Error(`Failed to index document ${error.toString()}`);
    }
  },

  deleteElasticSearchDocument: async (docId) => {
    try {
      return await client.delete_by_query({
        index: 'documents',
        body: {
          query: {
            match: {
              docId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  searchDocumentElastic: async (query) => {
    try {
      const result = await client.search({
        index: 'documents',
        body: {
          query: {
            multi_match: {
              query,
              fields: ['title', 'body', 'category'],
              fuzziness: 1,
            },
          },
        },
      });
      if (result.statusCode === 200) {
        return result.body.hits.hits;
      }
      throw new Error('Search went doouuuwnn..');
    } catch (error) {
      throw new Error(error);
    }
  },
};
