const mongoose = require('mongoose');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const databaseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(connUri, databaseOptions, (err) => {
  if (!err) {
    return process.stdout.write('Connection to the database established');
  }
  throw new Error(`Error connection to the database! ${err.toString()}`);
});
