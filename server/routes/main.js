import express from "express";
import authRoutes from "./authRoutes.js";
import { currentSession } from "../middleware/auth.middleware.js";
import { ExpressAuth } from "@auth/express";
import authConfig from "../src/config/auth.config.js";
import {
  errorHandler,
  errorNotFoundHandler,
} from "../middleware/error.middleware.js";

const router = express.Router();

router.use("/", authRoutes);

export default router;
