const
    mongoose = require('mongoose'),
    connUri = process.env.MONGO_LOCAL_CONN_URL,
    databaseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }


mongoose.connect(connUri, databaseOptions, (err) => {
    if (!err) {
        return console.log(`Connection to the database established`)
    }
    throw new Error(`Error connection to the database! ${err.toString()}`)
});