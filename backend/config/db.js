const mongoose = require('mongoose');

let cachedConnectionPromise = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((conn) => {
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn.connection;
      })
      .catch((error) => {
        cachedConnectionPromise = null;
        console.error(`MongoDB connection error: ${error.message}`);
        throw error;
      });
  }

  return cachedConnectionPromise;
};

module.exports = connectDB;
