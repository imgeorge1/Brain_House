const express = require('express');
const signup = require('../controllers/authController');
const { lessons, lessonsGET } = require('../controllers/lessonController');
const ticket = require('../controllers/ticketController');

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
const passport = require('../config/passport');
const authRoutes = express.Router();
// Passport JS
// auth with google

authRoutes.get(
  '/login/success',
  passport.authenticate('google'),
  (req, res) => {
    try {
      console.log('req   user', req.user);
      if (req.user) {
        // If user is authenticated, send the serialized user data
        res.status(200).json({ message: 'user Login', user: req.user });
      } else {
        // If user is not authenticated, send an error message
        res.status(400).json({ message: 'Not Authorized' });
      }
    } catch (error) {
      // Handle any errors that might occur
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

authRoutes.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

authRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

// auth with facebook
authRoutes.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

authRoutes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
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
