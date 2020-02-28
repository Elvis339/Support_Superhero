module.exports = {
  development: {
    port: process.env.PORT || 3001,
    env: 'development',
    saltingRounds: 10,
    socketPort: 3002,
    socketUrl: 'localhost',
    file_path_name: 'Support_Superhero',
  },
  production: {
    port: process.env.PORT || 3000,
    env: 'production',
    saltingRounds: 10,
    socketPort: 3002,
    socketUrl: 'localhost',
    file_path_name: 'Support_Superhero',
  },
  socket: {
    socketServerPort: 3002,
    socketServerUrl: '127.0.0.1'
  }
};
