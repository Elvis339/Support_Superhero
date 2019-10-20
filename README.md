# Node - React - JWT Authentication 

Boilerplate for running Node-React-JWT 

### Why shoud I use this?

After spending 72 hours finding the best practices on folder/code/jwt structure, here's the masterpeice 
🧘‍ 

Hope it will help you as much as it did me to **kickstart** your project.

# How to

1. Setup

This command will install all dependencies required for node & react

```
npm install && cd client/ && npm install
```

Don't forget to create your own .env file, here's an example:

```
JWT_SECRET=randomTextLol
MONGO_LOCAL_CONN_URL=mongodb://127.0.0.1:27017/random-db
MONGO_DB_NAME=random-db
```

2. Scripts in package.json 

* npm run start => Production build
* npm run server => Run a Node server with nodemon
* npm run client => Run a React server without Node
* npm run dev => Run Node/React server, while Node is listening on port **3001** & React on **3000**