const mongoose = require('mongoose');
const config = require('../../config');

const { NODE_ENV } = config;
const MONGO_URI = config[NODE_ENV].database.mongoUri;

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.info(`MongoDb Connected: ${connection.connection.host}`.cyan.underline.bold);
    return connection;
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`.red.bold);
  }
};

module.exports = connectToDb;
