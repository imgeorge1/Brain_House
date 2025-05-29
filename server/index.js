import dotenv from "dotenv/config";
import express from "express";
import path from "path";
import generateSitemap from "./generateSitemap.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import mongoConnection from "./db/mongoConnection.js";
import router from "./routes/main.js";
import { fileURLToPath } from "url";

import {
  errorHandler,
  errorNotFoundHandler,
} from "./middleware/error.middleware.js";
import { currentSession } from "./middleware/auth.middleware.js";
import authConfig from "./src/config/auth.config.js";
import { ExpressAuth } from "@auth/express";
import mongoose from "mongoose";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", true);

// Serve robots.txt
app.use("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// Serve sitemap.xml
app.get("/sitemap.xml", async (req, res) => {
  try {
    const sitemap = await generateSitemap();
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
});

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "client/build")));

// Connect to MongoDB
await mongoConnection();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "https://drive.google.com"],
    credentials: true,
  })
);
const { models } = await mongoConnection();

// const syncSigns = async () => {
//   try {
//     // 4. Get all signs from the old database
//     const oldSigns = await models.OldSigns.find();

//     // 5. Delete all existing signs in the new database
//     await models.Signs.deleteMany({});

//     // 6. Insert old signs into the new database
//     await models.Signs.insertMany(oldSigns);

//     console.log(`✅ Synced ${oldSigns.length} signs to the new database.`);
//   } catch (err) {
//     console.error("❌ Sync failed:", err);
//   }
// };

// syncSigns();
// const idsToDelete = [
//   9, 11, 16, 25, 31, 32, 34, 37, 40, 43, 56, 57, 58, 62, 79, 122, 123, 125, 130,
//   163, 172, 173, 174, 188, 190, 204, 208, 211, 219, 246, 260, 263, 268, 272,
//   293, 303, 325, 328, 333, 354, 355, 398, 449, 450, 463, 471, 475, 476, 520,
//   522, 555, 565, 582, 689, 699, 801, 802, 803, 804, 805, 806, 808, 809, 822,
//   844, 845, 847, 849, 859, 869, 870, 873, 887, 895, 896, 897, 898, 901, 903,
//   910, 914, 916, 919, 920, 923, 924, 946, 991, 993, 1010, 1032, 1037, 1038,
//   1042, 1050, 1052, 1053, 1056, 1059, 1072, 1081, 1083, 1088, 1106, 1131, 1132,
//   1133, 1134, 1236, 1238, 1258, 1316, 1318, 1321, 1322, 1327, 1328, 1329, 1330,
//   1331, 1332, 1336, 1337, 1338, 1339, 1345, 1346, 1347, 1349, 1353, 1354, 1355,
//   1380, 1430, 1439, 1449, 1482, 1486, 1651, 1699, 1700, 1701, 1702, 1703, 1704,
//   1705, 1706, 1707, 1708, 1711, 1712, 1713, 1714, 1715, 1716, 1718, 1719, 1720,
//   1721, 1722, 1723,
// ];

// await models.Ticket.deleteMany({ id: { $in: idsToDelete } });
// console.log("Selected tickets deleted successfully");

// const tickets = await models.Ticket.find({}, { id: 1, _id: 0 }).sort({
//   $natural: 1,
// });
// const ticketIds = tickets.map((ticket) => ticket.id);
// console.log(ticketIds);
// const ticketsDocs = await models.Ticket.find({});
// const cleanedTickets = ticketsDocs.map((doc) => doc._doc);
// const { models } = await mongoConnection();

// Step 1: Get the old tickets in order (as plain objects)
// const oldTickets = await models.OldTicket.find().sort({ _id: 1 }).lean(); // or sort({ id: 1 })

// // Step 2: Insert them into the new DB
// await models.Ticket.deleteMany(); // optional: clear old data first

// await models.Ticket.insertMany(oldTickets); // keeps the original _id and no extra Mongoose metadata

// console.log("✅ Migration complete!");

// const migrateAndSortTickets = async () => {
//   const { models, db1Connection } = await mongoConnection();
//   const { Ticket, OldTicket } = models;

//   try {
//     console.log("🔄 Fetching ordered ticket IDs from old DB...");

//     const oldTickets = await OldTicket.find({}, { id: 1 }).sort({
//       $natural: 1,
//     });
//     const orderedIds = oldTickets.map((ticket) => ticket.id);

//     console.log(`✅ Got ${orderedIds.length} IDs from old DB.`);

//     console.log("📦 Fetching tickets from new DB matching those IDs...");

//     const newTickets = await Ticket.find({ id: { $in: orderedIds } });
//     const ticketMap = new Map(newTickets.map((ticket) => [ticket.id, ticket]));

//     const orderedTickets = orderedIds
//       .map((id) => ticketMap.get(id))
//       .filter(Boolean); // Remove undefined if some IDs are missing

//     console.log(`🧹 Dropping 'tickets' collection in new DB...`);
//     await db1Connection.dropCollection("tickets");

//     console.log("🚀 Reinserting tickets in correct order...");
//     await db1Connection
//       .collection("tickets")
//       .insertMany(orderedTickets.map(({ _id, ...rest }) => rest));

//     console.log(
//       "✅ Migration complete. New DB is now ordered like the old DB."
//     );
//   } catch (error) {
//     console.error("❌ Migration failed:", error.message);
//   } finally {
//     await db1Connection.close();
//     console.log("🔌 Closed DB connection.");
//   }
// };

// migrateAndSortTickets();

app.use(currentSession);
app.use("/auth", ExpressAuth(authConfig));

app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
