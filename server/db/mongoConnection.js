import dotenv from "dotenv/config";
import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL;
console.log("MONGODB_URL", process.env.MONGODB_URL);
const mongoConnection = async () => {
  try {
    // Establish MongoDB connection
    mongoose.connect(process.env.MONGODB_URL);

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

export default mongoConnection;
