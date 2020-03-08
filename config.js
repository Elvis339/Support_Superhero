module.exports = {
  development: {
    port: process.env.PORT || 3001, // React listening on 3000
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
    sslPath: '',
    file_path_name: 'Support_Superhero',
  },
};

// /Users/elvissabanovic/Desktop/Support_Superhero/dev/nginx/certs