import dotenv from "dotenv/config";
import Google from "@auth/express/providers/google";
import User from "../../models/userSchema.js";

console.log(process.env.AUTH_GOOGLE_ID);
console.log(process.env.AUTH_GOOGLE_SECRET);
console.log(process.env.AUTH_SECRET);

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // __Secure-
  // __Host-
  // cookies: {
  //   sessionToken: {
  //     name: `authjs.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "None",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   callbackUrl: {
  //     name: "authjs.callback-url",
  //     options: {
  //       sameSite: "None",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  //   csrfToken: {
  //     name: "authjs.csrf-token",
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
    async redirect({ url, baseUrl }) {
      console.log(url);
      // Redirect after sign-in or sign-out
      if (url.startsWith(process.env.CLIENT_URL)) {
        return url;
      }
      // Default to home page
      return `${process.env.CLIENT_URL}/`;
    },

    async signIn({ profile }) {
      if (!profile) throw new Error("Google authentication failed");

      const { given_name, family_name, email, picture } = profile;
      // console.log("Google Profile:", profile);
      try {
        let user = await User.findOne({ email });

        if (!user) {
          // If user doesn't exist, create a new user in MongoDB
          user = new User({
            firstName: given_name,
            lastName: family_name,
            email,
            image: picture,
            provider: "google",
          });
          await user.save();
        }
        console.log("User authenticated:", user);

        return true;
      } catch (error) {
        console.error("Error saving user:", error);
        return false; // Deny sign-in if an error occurs
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user; // Attach user info to the session
        console.log("Token saved");
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
