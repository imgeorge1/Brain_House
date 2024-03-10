const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/userSchema');

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'https://brain-house-vkk7.onrender.com/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name'],
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      if (!profile.emails || profile.emails.length === 0) {
        return cb(new Error('Email not provided in the profile'), null);
      }

      const email = profile.emails[0].value;

      let user = await User.findOne({ email });
      console.log('facebook profile', profile);
      console.log('if facebook user exists', user);

      if (!user) {
        user = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: email,
          provider: 'facebook', // Set the provider property
        });
        console.log('if facebook user does not exist', user);
      }
      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
);

passport.serializeUser(function (user, done) {
  console.log('serialized user', user);

  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    console.log('deserialized user', user);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = facebookStrategy;
