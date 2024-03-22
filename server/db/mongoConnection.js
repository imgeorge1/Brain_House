require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URL =
  "mongodb+srv://brainhousework:KKmSI8XGVsCvOpRG@brainhouse.vzzz3.mongodb.net/";

const mongoConnection = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
};

module.exports = mongoConnection;
