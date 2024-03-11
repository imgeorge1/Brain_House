const express = require('express');
const signup = require('../controllers/authController');
const { lessons, lessonsGET } = require('../controllers/lessonController');
const ticket = require('../controllers/ticketController');
const User = require('../models/userSchema'); // Adjust the path as per your project structure

const {
  auth,
  callbackAuth,
  fbCallbackAuth,
  fbAuth,
  redirect,
} = require('../config/auth/passportAuth');
const { login, logout } = require('../config/loginLogout/loginLogout');
const {
  users,
  getUserById,
  updateUserPaidStatus,
} = require('../controllers/showUsers');
const googleStrategy = require('../config/passport/google');
const facebookStrategy = require('../config/passport/facebook');

const authRoutes = express.Router();

// Passport JS
// auth with google

// authRoutes.get('/login/success', (req, res) => {});

// authRoutes.get('/login/failed', (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: 'failure',
//   });
// });

authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

authRoutes.get(
  '/auth/google',
  googleStrategy.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/auth/google/callback',
  googleStrategy.authenticate('google', {
    failureRedirect: '/login/failed',
  }),
  async (req, res) => {
    try {
      const newUser = {
        profileId: res.req.user.id,
        firstName: res.req.user.firstName,
        lastName: res.req.user.lastName,
        email: res.req.user.email,
        provider: res.req.user.provider,
      };
      console.log('res,req userererer', res.req.user);
      console.log('newUser', newUser);
      const existingUser = await User.findOne({
        where: { profileId: newUser.profileId },
      });
      console.log('existingUser', existingUser);

      if (existingUser) {
        const userId = existingUser.id;
        console.log('userID', userId);
        newUser.id = userId;
      } else if (!existingUser) {
        // Check if the user with the same email exists
        const existingEmailUser = await User.findOne({
          where: { email: newUser.email },
        });

        if (existingEmailUser) {
          // Handle case where email already exists
          console.log('Email already exists in the database');
          // You can choose to send an error response or take other actions
          return res.status(400).json({ message: 'Email already exists' });
        }

        // If email does not exist, create a new user
        const createdUser = await User.create(newUser);
        const userId = createdUser.id;
        newUser.id = userId;
      }

      const jwtToken = jwt.sign(newUser, jwtSecret, { expiresIn: '4h' });
      console.log('jwtToken', jwtToken);

      res.cookie('jwtToken', jwtToken, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 4,
      });
      const encodedJwtToken = encodeURIComponent(jwtToken);
      console.log('encodedJwtToken', encodedJwtToken);
      res.redirect(
        `${process.env.CLIENT_URL}/?message=Login%20successful&jwtToken=${encodedJwtToken}`
      );
    } catch (error) {
      console.log('logging in error: ', error);
      // Handle other errors if necessary
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// auth with facebook
authRoutes.get(
  '/auth/facebook',
  facebookStrategy.authenticate('facebook', { scope: ['email'] })
);

authRoutes.get(
  '/auth/facebook/callback',
  facebookStrategy.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

////////////End Passport JS

authRoutes.post('/signup', signup);

authRoutes.post('/lessons', lessons);
authRoutes.get('/lessonsAll', lessonsGET);

authRoutes.get('/users', users);
authRoutes.get('/users/:userId', getUserById);
authRoutes.put('/users/:userId', updateUserPaidStatus);

authRoutes.get('/tickets/:id', ticket);

module.exports = authRoutes;
