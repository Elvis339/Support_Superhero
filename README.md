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

# Commands

* npm run start => Production build
* npm run server => Run a Node server with nodemon
* npm run client => Run a React server without Node
* npm run dev => Run Node/React server, while Node is listening on port **3001** & React on **3000**