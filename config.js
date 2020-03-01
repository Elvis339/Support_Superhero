module.exports = {
  development: {
    port: 3001, // React listening on 3000
    url: 'http://127.0.0.1',
    env: 'development',
    saltingRounds: 10,
    file_path_name: 'Support_Superhero',
  },
  production: {
    port: process.env.PORT || 3000,
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
