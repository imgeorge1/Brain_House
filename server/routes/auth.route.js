import express from "express";
import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";

const authHandler = ExpressAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET, // Required for session signing
  basePath: "/auth",
  trustHost: true,
});

export default authHandler;
