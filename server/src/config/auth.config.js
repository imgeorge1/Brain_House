import dotenv from "dotenv/config";
import Google from "@auth/express/providers/google";
import mongoConnection from "../../db/mongoConnection.js";
import jwt from "jsonwebtoken";

const { models } = await mongoConnection();

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      callbackUrl: "http://localhost:3000/auth/callback/google",
    }),
  ],
  // __Secure-
  // __Host-
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-authjs.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "None",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   callbackUrl: {
  //     name: "__Secure-authjs.callback-url",
  //     options: {
  //       sameSite: "None",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   csrfToken: {
  //     name: "__Host-authjs.csrf-token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "None",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  // },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.AUTH_SECRET,
  },

  callbacks: {
    async redirect({ url }) {
      const payload = { email: "user@example.com" }; // You can dynamically get this from your user/session info

      const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const clientUrl = process.env.CLIENT_URL;

      // Redirect after sign-in or sign-out
      if (url.startsWith(clientUrl)) {
        return `${clientUrl}?token=${signedToken}`;
      }

      // Default to home page
      return `${clientUrl}?token=${signedToken}`;
    },

    async signIn({ profile }) {
      if (!profile) throw new Error("Google authentication failed");

      const { given_name, family_name, email, picture } = profile;
      // console.log("Google Profile:", profile);
      try {
        let user = await models.User.findOne({ email });

        if (!user) {
          // If user doesn't exist, create a new user in MongoDB
          user = new models.User({
            firstName: given_name,
            lastName: family_name,
            email,
            image: picture,
            provider: "google",
          });
          await user.save();
        }
        // console.log("User authenticated:", user);

        return true;
      } catch (error) {
        console.error("Error saving user:", error);
        return false; // Deny sign-in if an error occurs
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user; // Attach user info to the session
        // console.log("Token saved");
      }
      return session;
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.user = {
          name: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          provider: "google",
        };
      }

      return token;
    },
  },
};

export default authConfig;
