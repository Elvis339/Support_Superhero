module.exports = {
  development: {
    port: process.env.PORT || 3001,
    env: 'development',
    saltingRounds: 10,
    socketPort: 3002,
    socketUrl: 'localhost',
  },
  production: {
    env: 'production',
    saltingRounds: 10,
    socketPort: 3002,
    socketUrl: 'localhost',
  },
};
