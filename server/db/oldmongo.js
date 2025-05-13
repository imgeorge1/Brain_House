// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// let oldDbConnection;

// const oldMongoConnection = async () => {
//   if (oldDbConnection) return oldDbConnection;

//   oldDbConnection = mongoose.createConnection(process.env.OLD_MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("OLD_MONGODB_URL", process.env.MONGODB_URL);

//   console.log("✅ Connected to OldMongoDB");
//   return oldDbConnection;
// };

// export default oldMongoConnection;
