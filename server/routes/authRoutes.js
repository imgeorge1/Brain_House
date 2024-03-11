const express = require('express');
const signup = require('../controllers/authController');
const { lessons, lessonsGET } = require('../controllers/lessonController');
const ticket = require('../controllers/ticketController');
const User = require('../models/userSchema'); // Adjust the path as per your project structure
const jwt = require('jsonwebtoken');
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

const jwtSecret = process.env.JWT_SECRET;
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
  '/auth/google/callback',
  googleStrategy.authenticate('google', {
    failureRedirect: '/login/failed',
  }),
  async (req, res) => {
    try {
      const { id, displayName, email } = req.user;
      console.log('req.user', req.user);

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // User already exists, proceed with existing user
        const jwtToken = jwt.sign({ userId: existingUser.id }, jwtSecret, {
          expiresIn: '4h',
        });
        res.cookie('jwtToken', jwtToken, {
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 4,
        });
        const encodedJwtToken = encodeURIComponent(jwtToken);
        res.redirect(
          `${process.env.CLIENT_URL}/?message=Login%20successful&jwtToken=${encodedJwtToken}`
        );
      } else {
        // Create new user
        const newUser = await User.create({
          profileId: id,
          displayName,
          email,
        });
        const jwtToken = jwt.sign({ userId: newUser.id }, jwtSecret, {
          expiresIn: '4h',
        });
        res.cookie('jwtToken', jwtToken, {
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 4,
        });
        const encodedJwtToken = encodeURIComponent(jwtToken);
        res.redirect(
          `${process.env.CLIENT_URL}/?message=Login%20successful&jwtToken=${encodedJwtToken}`
        );
      }
    } catch (error) {
      console.log('Logging in error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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
