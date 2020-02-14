module.exports = {
  development: {
    port: process.env.PORT || 3001, // Set to 3001 because of React running on 3000
    saltingRounds: 10,
  },
};
