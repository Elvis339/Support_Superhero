module.exports = {
  development: {
    port: process.env.PORT || 3001,
    env: 'development',
    saltingRounds: 10,
    socketPort: 3002,
    socketUrl: 'localhost',
  },
  production: {
    port: process.env.PORT || 3000,
    env: 'production',
    saltingRounds: 10,
    socketPort: 3002,
    socketUrl: 'localhost',
  },
};
