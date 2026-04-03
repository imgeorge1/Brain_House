import dotenv from "dotenv/config";
import express from "express";
import authRoutes from "./authRoutes.js";
import generateSitemap from "../generateSitemap.js";


const router = express.Router();

router.use("/", authRoutes);

router.get("/", (req, res) => {
  const token = req.cookies["authjs.session-token"];

  if (token) {
    console.log("Session token found, redirecting to frontend...");
    res.send("hellooo");
  } else {
    console.log("No session token found, clearing all cookies...");
  }
});

router.get("/sitemap.xml", async (req, res) => {
  const xml = await generateSitemap();
  res.header("Content-Type", "application/xml");
  res.send(xml);
});

export default router;
