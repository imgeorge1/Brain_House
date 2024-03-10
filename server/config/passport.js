require('dotenv').config();
const User = require('../models/userSchema'); // Adjust the path as per your project structure

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const passport = require('passport');

// AUTH with GOOGLE

const DEV_MODE = process.env.NODE_ENV === 'production';

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '945913383511-forclflr8ehf5868ij9hvi1n226ripkl.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: DEV_MODE
        ? 'https://brain-house-vkk7.onrender.com/auth/google/callback'
        : 'http://localhost:3001/auth/google/callback',
      scope: ['email', 'profile'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          return cb(new Error('Email not provided in the profile'), null);
        }

        const email = profile.emails[0].value;

        let user = await User.findOne({ email });
        console.log('google profile', profile);
        console.log('if google user exists', user);
        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: email,
            provider: 'google', // Set the provider property
          });
          console.log('if Google user does not exist', user);
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: '7443601629015931',
      clientSecret: 'f77d296aec2da199c5ddb49b8bf72bfa',
      callbackURL: DEV_MODE
        ? 'https://brain-house-vkk7.onrender.com/auth/facebook/callback'
        : 'http://localhost:3001/auth/facebook/callback',
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
  )
);

// Deserialize by user id

passport.serializeUser(function (user, done) {
  console.log('serialized user', user);
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  console.log('hello');
  try {
    const user = await User.findById(id);
    console.log('Deserialized user', user);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

module.exports = passport;
