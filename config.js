module.exports = {
  development: {
    port: process.env.PORT || 3001,
    url: 'http://127.0.0.1',
    env: 'development',
    saltingRounds: 10,
    file_path_name: 'Support_Superhero',
  },
  production: {
    port: process.env.PORT,
    url: 'https://superhero.activecollab.com',
    env: 'production',
    saltingRounds: 10,
    file_path_name: 'Support_Superhero',
  },
  socket: {
    socketServerPort: 3002,
    socketServerUrl: '127.0.0.1',
  },
};
