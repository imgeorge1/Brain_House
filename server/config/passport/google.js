const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/userSchema");

const DEV_MODE = process.env.NODE_ENV === "developer";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: DEV_MODE
        ? "http://localhost:3001/auth/google/callback"
        : process.env.GOOGLE_CALLBACK_URL ||
          "https://brain-house-api.onrender.com/auth/google/callback",
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          const error = new Error("Email not provided in the profile");
          console.error("Google OAuth Error:", error.message);
          return cb(new Error("Email not provided in the profile"), null);
        }

        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: email,
            provider: "google", // Set the provider property
            completed: 2,
            isPaid: false,
          });

          console.log("New user created:", user.email);
        }
        return cb(null, user);
      } catch (error) {
        console.error("Google OAuth Error:", error.message);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
