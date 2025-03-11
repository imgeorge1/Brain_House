import Google from "@auth/express/providers/google";
import User from "../../models/userSchema.js";

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      if (!profile) throw new Error("Google authentication failed");

      const { name, email, picture } = profile;

      try {
        let user = await User.findOne({ email });

        if (!user) {
          // If user doesn't exist, create a new user in MongoDB
          user = new User({
            firstName: name,
            email,
            image: picture,
            provider: "google",
          });
          await user.save();
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error saving user:", error);
        return false; // Deny sign-in if an error occurs
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user; // Attach user info to the session
      }
      return session;
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.user = {
          name: profile.name,
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
