import dotenv from "dotenv/config";
import mongoose from "mongoose";
import userSchema from "../models/userSchema.js";
import AdditionUserInfoSchema from "../models/AdditionUserInfoSchema.js";
import commentSchema from "../models/commentsSchema.js";
import signSchema from "../models/signSchema.js";
import ticketSchema from "../models/ticketSchema.js";

// const MONGODB_URL = process.env.MONGODB_URL;
console.log("MONGODB_URL", process.env.MONGODB_URL);
const mongoConnection = async () => {
  try {
    // Establish MongoDB connection
    const db1Connection = mongoose.createConnection(process.env.MONGODB_URL);
    const db2Connection = mongoose.createConnection(
      process.env.OLD_MONGODB_URL
    );

    // Log success message
    db1Connection.on("open", () => {
      console.log("✅ Connected to db1Connection");
    });

    db2Connection.on("open", () => {
      console.log("✅ Connected to db2Connection");
    });

    const User = db1Connection.model("User", userSchema);
    const OldUser = db1Connection.model("User", userSchema);
    const AdditionUserInfo = db1Connection.model(
      "AdditionUserInfo",
      AdditionUserInfoSchema
    );
    const OldAdditionUserInfo = db1Connection.model(
      "AdditionUserInfo",
      AdditionUserInfoSchema
    );
    const Comment = db1Connection.model("Comment", commentSchema);
    const Signs = db1Connection.model("Sign", signSchema);
    const Ticket = db1Connection.model("Ticket", ticketSchema);
    // Return the connection object
    return {
      db1Connection,
      db2Connection,
      models: {
        User,
        OldUser,
        AdditionUserInfo,
        OldAdditionUserInfo,
        Comment,
        Signs,
        Ticket,
      },
    };
  } catch (error) {
    // Log error message
    console.error("Error connecting to MongoDB:", error);

    // Throw an error to handle it at a higher level
    throw new Error("MongoDB connection failed");
  }
};

export default mongoConnection;
