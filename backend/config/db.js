const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eduminatti';
    
    // Connect with timeout options so it doesn't hang indefinitely if mongo is unavailable
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host} | DB: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Warning] MongoDB connection failed: ${error.message}`);
    console.warn(`[Database Notice] Server will continue running. Ensure MongoDB is running or configure MONGODB_URI in backend/.env for persistent storage.`);
    return null;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };

