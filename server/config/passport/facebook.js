const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/userSchema");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        "http://localhost:3001/auth/facebook/callback", // https://brain-house-vkk7.onrender.com/auth/facebook/callback
      profileFields: ["id", "emails", "name"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          const error = new Error("Email not provided in the profile");
          console.error("Facebook OAuth Error:", error.message);
          return cb(new Error("Email not provided in the profile"), null);
        }

        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: email,
            provider: "facebook", // Set the provider property
          });
          console.log("New user created:", user.email);
        }
        return cb(null, user);
      } catch (error) {
        console.error("Facebook OAuth Error:", error.message);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Deserialization Error:", error.message);
    done(error, null);
  }
});

module.exports = passport;
