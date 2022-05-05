const mongoose = require('mongoose');

// eslint-disable-next-line no-warning-comments
// TODO: Change Mongo URI dynamically according to environment.
// Right now is always set to local.
const MONGO_URI = 'mongodb://localhost:27017';

const connectToDb = () => {
  mongoose
    .connect(MONGO_URI)
    .then((connection) =>
      console.log(`MongoDb Connected: ${connection.connection.host}`.cyan.underline.bold),
    )
    .catch((error) => console.log(`MongoDB connection error: ${error}`.red.bold));
};

module.exports = connectToDb;
