const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;
console.log("MONGODB_URL", MONGODB_URL);
const mongoConnection = async () => {
  try {
    // Establish MongoDB connection
    mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });

    // Log success message
    console.log("Connected to MongoDB");

    // Return the connection object
    return mongoose.connection;
  } catch (error) {
    // Log error message
    console.error("Error connecting to MongoDB:", error);

    // Throw an error to handle it at a higher level
    throw new Error("MongoDB connection failed");
  }
};

module.exports = mongoConnection;
