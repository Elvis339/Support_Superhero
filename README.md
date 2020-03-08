# Requirements

1. Node v12.16.1
2. npm 6.13.4
3. MongoDB v4.0.3

# How to

1. Setup

This command will install all dependencies required for node & build react frontend.

```
sh start.sh  
```

Don't forget to create your own .env file, here's an example:

```
JWT_SECRET=BigHashHere
MONGO_LOCAL_CONN_URL=mongodb://127.0.0.1:27017/your-db-here
MONGO_DB_NAME=your-db-here
```

# Nginx Configuration

```
server {
    listen 443 ssl;

    ssl_certificate /full-path-to/Support_Superhero/dev/nginx/certs/server.cert; 
    ssl_certificate_key /full-path-to/Support_Superhero/dev/nginx/certs/server.key;

    access_log /full-path-to/Support_Superhero/dev/nginx/access_log/access.log;
    error_log /full-path-to/Support_Superhero/dev/nginx/error_log/error.log;

    location / {
        proxy_pass https://127.0.0.1:3000; # Change this to match your URL
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        add_header X-Whom www-node01;
    }
}
```

# Commands

* npm run start => Production build
* npm run server => Run a Node server with nodemon
* npm run client => Run a React server without Node
* npm run dev => Run Node/React server, while Node is listening on port **3001** & React on **3000**