const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/userSchema");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback", // https://brain-house-vkk7.onrender.com/auth/google/callback
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          return cb(new Error("Email not provided in the profile"), null);
        }

        const email = profile.emails[0].value;

        let user = await User.findOne({ email });
        console.log("google profile", profile);
        console.log("if google user exists", user);
        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: email,
            provider: "google", // Set the provider property
            completed: 1,
          });
          console.log("if Google user does not exist", user);
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serialized google user", user);

  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    console.log("deserialized google user", user);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
